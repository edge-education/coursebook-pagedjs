import Handler from "../handler.js";

class Splits extends Handler {
	constructor(chunker, polisher, caller) {
		super(chunker, polisher, caller);
	}

	afterPageLayout(pageElement, page, breakToken, chunker) {
		let splits = Array.from(pageElement.querySelectorAll("[data-split-from]"));
		let pages = pageElement.parentNode;
		let index = Array.prototype.indexOf.call(pages.children, pageElement);
		let prevPage;

		if (index === 0) {
			return;
		}

		prevPage = pages.children[index - 1];

		let from; // Capture the last from element
		splits.forEach((split) => {
			let ref = split.dataset.ref;
			from = prevPage.querySelector("[data-ref='"+ ref +"']:not([data-split-to])");

			if (from) {
				from.dataset.splitTo = ref;

				if (!from.dataset.splitFrom) {
					from.dataset.splitOriginal = true;
				}
			}
		});

		// Fix alignment on the deepest split element
		if (from) {
			this.handleAlignment(from);
		}

		// Clamp any DIV whose box extends past its page's content area into the
		// hidden overflow column. Two sources: author CSS stretching split boxes to
		// the full pagebox height (the frame-to-page-bottom look) — the stretched
		// frame fragments into a ghost ~3 page-widths to the right that print clips
		// and the margin guard flags; and boxes that merely end flush with the area
		// bottom, whose border box crosses by a sub-pixel and parks a 1px decoration
		// sliver. Ending the box exactly at the area bottom keeps the intended look
		// without the parked fragment.
		let prevArea = prevPage.querySelector(".pagedjs_area");
		if (prevArea) {
			let areaRect = prevArea.getBoundingClientRect();
			// Innermost first: clamping the stretched descendant collapses its ghost
			// fragment, so the wrapper chain above it re-measures clean and is left
			// untouched (no stray max-height on every wrapper in the capture).
			Array.prototype.slice.call(prevArea.querySelectorAll("div")).reverse().forEach((el) => {
				// Only clamp plain in-flow block boxes. A height constraint on table
				// internals redistributes row heights (the very defect this guards
				// against), and positioned boxes may bleed into the margin band by
				// design (e.g. opener badges).
				let rects = el.getClientRects();
				if (rects.length < 2) return;
				let first = rects[0];
				if (first.left >= areaRect.right) return; // wholly parked — height can't fix it
				let hasParkedFragment = false;
				for (let r = 1; r < rects.length; r++) {
					if (rects[r].left >= areaRect.right) {
						hasParkedFragment = true;
						break;
					}
				}
				if (!hasParkedFragment) return;
				let styles = window.getComputedStyle(el);
				// Skip only out-of-flow boxes (design bleeds like opener badges);
				// relative boxes still fragment in flow and need the clamp.
				if (styles.position === "absolute" || styles.position === "fixed") return;
				let target = areaRect.bottom - first.top;
				if (styles.boxSizing !== "border-box") {
					target -= (parseFloat(styles.borderTopWidth) || 0) + (parseFloat(styles.borderBottomWidth) || 0)
						+ (parseFloat(styles.paddingTop) || 0) + (parseFloat(styles.paddingBottom) || 0);
				}
				if (target > 0) {
					// max-height (not height): caps the stretched frame at the area
					// bottom while leaving auto-height boxes untouched.
					el.style.maxHeight = Math.floor(target * 100) / 100 + "px";
					el.style.minHeight = "0";
				}
			});
		}
	}

	handleAlignment(node) {
		let styles = window.getComputedStyle(node);
		let align = styles["text-align"];
		let alignLast = styles["text-align-last"];
		node.dataset.lastSplitElement = "true";
		if (align === "justify" && alignLast === "auto") {
			node.dataset.alignLastSplitElement = "justify";
		} else {
			node.dataset.alignLastSplitElement = alignLast;
		}
	}

}

export default Splits;
