/**
 * Render result.
 * @class
 */
class RenderResult {

	constructor(breakToken, error) {
		this.breakToken = breakToken;
		this.error = error;
	}
}

export class OverflowContentError extends Error {
	constructor(message, items, componentId = null) {
		super(message);
		this.items = items;
		this.componentId = componentId;
	}
}

export default RenderResult;
