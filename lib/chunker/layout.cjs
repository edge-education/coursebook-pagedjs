"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _utils = require("../utils/utils.cjs");
var _dom = require("../utils/dom.cjs");
var _breaktoken = _interopRequireDefault(require("./breaktoken.cjs"));
var _renderresult = _interopRequireWildcard(require("./renderresult.cjs"));
var _eventEmitter = _interopRequireDefault(require("event-emitter"));
var _hook = _interopRequireDefault(require("../utils/hook.cjs"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var MAX_CHARS_PER_BREAK = 1500;

/**
 * Layout
 * @class
 */
var Layout = /*#__PURE__*/function () {
  function Layout(element, hooks, options) {
    (0, _classCallCheck2["default"])(this, Layout);
    this.element = element;
    this.bounds = this.element.getBoundingClientRect();
    this.parentBounds = this.element.offsetParent.getBoundingClientRect();
    var gap = parseFloat(window.getComputedStyle(this.element).columnGap);
    if (gap) {
      var leftMargin = this.bounds.left - this.parentBounds.left;
      this.gap = gap - leftMargin;
    } else {
      this.gap = 0;
    }
    if (hooks) {
      this.hooks = hooks;
    } else {
      this.hooks = {};
      this.hooks.onPageLayout = new _hook["default"]();
      this.hooks.layout = new _hook["default"]();
      this.hooks.renderNode = new _hook["default"]();
      this.hooks.layoutNode = new _hook["default"]();
      this.hooks.beforeOverflow = new _hook["default"]();
      this.hooks.onOverflow = new _hook["default"]();
      this.hooks.afterOverflowRemoved = new _hook["default"]();
      this.hooks.onBreakToken = new _hook["default"]();
      this.hooks.beforeRenderResult = new _hook["default"]();
    }
    this.settings = options || {};
    this.maxChars = this.settings.maxChars || MAX_CHARS_PER_BREAK;
    this.forceRenderBreak = false;
    this.error = null;
  }
  return (0, _createClass2["default"])(Layout, [{
    key: "renderTo",
    value: function () {
      var _renderTo = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(wrapper, source, breakToken) {
        var bounds,
          start,
          walker,
          node,
          prevNode,
          done,
          next,
          hasRenderedContent,
          newBreakToken,
          length,
          prevBreakToken,
          imgs,
          errorMessage,
          errorDetails,
          component,
          componentId,
          _imgs,
          _errorMessage,
          _component,
          _componentId,
          afterNode,
          named,
          page,
          shallow,
          rendered,
          _imgs2,
          _errorMessage2,
          _component2,
          _componentId2,
          _afterNode,
          _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              bounds = _args.length > 3 && _args[3] !== undefined ? _args[3] : this.bounds;
              start = this.getStart(source, breakToken);
              walker = (0, _dom.walk)(start, source);
              hasRenderedContent = false;
              length = 0;
              prevBreakToken = breakToken || new _breaktoken["default"](start);
              this.hooks && this.hooks.onPageLayout.trigger(wrapper, prevBreakToken, this);
            case 7:
              if (!(!done && !newBreakToken)) {
                _context.next = 90;
                break;
              }
              next = walker.next();
              prevNode = node;
              node = next.value;
              done = next.done;
              if (node) {
                _context.next = 31;
                break;
              }
              this.hooks && this.hooks.layout.trigger(wrapper, this);
              imgs = wrapper.querySelectorAll("img");
              if (!imgs.length) {
                _context.next = 18;
                break;
              }
              _context.next = 18;
              return this.waitForImages(imgs);
            case 18:
              newBreakToken = this.findBreakToken(wrapper, source, bounds, prevBreakToken);
              if (!(newBreakToken && newBreakToken.equals(prevBreakToken))) {
                _context.next = 28;
                break;
              }
              errorMessage = "Unable to layout item";
              errorDetails = {
                item: prevNode
              };
              component = prevNode.closest('.component');
              componentId = component ? component.getAttribute('data-id') : null;
              this.error = _objectSpread(_objectSpread({
                errorMessage: errorMessage
              }, errorDetails), {}, {
                componentId: componentId
              });
              console.warn("".concat(errorMessage, ":"), prevNode);
              this.hooks && this.hooks.beforeRenderResult.trigger(undefined, wrapper, this);
              return _context.abrupt("return", new _renderresult["default"](undefined, new _renderresult.OverflowContentError(errorMessage, [prevNode], componentId)));
            case 28:
              this.rebuildTableFromBreakToken(newBreakToken, wrapper);
              this.hooks && this.hooks.beforeRenderResult.trigger(newBreakToken, wrapper, this);
              return _context.abrupt("return", new _renderresult["default"](newBreakToken));
            case 31:
              this.hooks && this.hooks.layoutNode.trigger(node);

              // Check if the rendered element has a break set
              if (!(hasRenderedContent && this.shouldBreak(node, start))) {
                _context.next = 54;
                break;
              }
              this.hooks && this.hooks.layout.trigger(wrapper, this);
              _imgs = wrapper.querySelectorAll("img");
              if (!_imgs.length) {
                _context.next = 38;
                break;
              }
              _context.next = 38;
              return this.waitForImages(_imgs);
            case 38:
              newBreakToken = this.findBreakToken(wrapper, source, bounds, prevBreakToken);
              if (!newBreakToken) {
                newBreakToken = this.breakAt(node);
              } else {
                this.rebuildTableFromBreakToken(newBreakToken, wrapper);
              }
              if (!(newBreakToken && newBreakToken.equals(prevBreakToken))) {
                _context.next = 52;
                break;
              }
              _errorMessage = "Unable to layout item";
              console.warn("".concat(_errorMessage, ":"), node);
              _component = node.closest('.component');
              _componentId = _component ? _component.getAttribute('data-id') : null;
              this.error = {
                msg: _errorMessage,
                item: node,
                componentId: _componentId
              };
              afterNode = newBreakToken.node ? (0, _dom.nodeAfter)(newBreakToken.node) : null;
              if (!afterNode) {
                _context.next = 51;
                break;
              }
              newBreakToken = new _breaktoken["default"](afterNode);
              _context.next = 52;
              break;
            case 51:
              return _context.abrupt("return", new _renderresult["default"](undefined, new _renderresult.OverflowContentError(_errorMessage, [node], _componentId)));
            case 52:
              length = 0;
              return _context.abrupt("break", 90);
            case 54:
              if (node.dataset && node.dataset.page) {
                named = node.dataset.page;
                page = this.element.closest(".pagedjs_page");
                page.classList.add("pagedjs_named_page");
                page.classList.add("pagedjs_" + named + "_page");
                if (!node.dataset.splitFrom) {
                  page.classList.add("pagedjs_" + named + "_first_page");
                }
              }

              // Should the Node be a shallow or deep clone
              shallow = (0, _dom.isContainer)(node);
              rendered = this.append(node, wrapper, breakToken, shallow);
              length += rendered.textContent.length;

              // Check if layout has content yet
              if (!hasRenderedContent) {
                hasRenderedContent = (0, _dom.hasContent)(node);
              }

              // Skip to the next node if a deep clone was rendered
              if (!shallow) {
                walker = (0, _dom.walk)((0, _dom.nodeAfter)(node, source), source);
              }
              if (!this.forceRenderBreak) {
                _context.next = 67;
                break;
              }
              this.hooks && this.hooks.layout.trigger(wrapper, this);
              newBreakToken = this.findBreakToken(wrapper, source, bounds, prevBreakToken);
              if (!newBreakToken) {
                newBreakToken = this.breakAt(node);
              } else {
                this.rebuildTableFromBreakToken(newBreakToken, wrapper);
              }
              length = 0;
              this.forceRenderBreak = false;
              return _context.abrupt("break", 90);
            case 67:
              if (!(length >= this.maxChars)) {
                _context.next = 88;
                break;
              }
              this.hooks && this.hooks.layout.trigger(wrapper, this);
              _imgs2 = wrapper.querySelectorAll("img");
              if (!_imgs2.length) {
                _context.next = 73;
                break;
              }
              _context.next = 73;
              return this.waitForImages(_imgs2);
            case 73:
              newBreakToken = this.findBreakToken(wrapper, source, bounds, prevBreakToken);
              if (newBreakToken) {
                length = 0;
                this.rebuildTableFromBreakToken(newBreakToken, wrapper);
              }
              if (!(newBreakToken && newBreakToken.equals(prevBreakToken))) {
                _context.next = 88;
                break;
              }
              _errorMessage2 = "Unable to layout item";
              _component2 = node.closest('.component');
              _componentId2 = _component2 ? _component2.getAttribute('data-id') : null;
              console.warn("".concat(_errorMessage2, ":"), node);
              this.error = {
                msg: _errorMessage2,
                item: node,
                componentId: _componentId2
              };
              _afterNode = newBreakToken.node ? (0, _dom.nodeAfter)(newBreakToken.node) : null;
              if (!_afterNode) {
                _context.next = 86;
                break;
              }
              newBreakToken = new _breaktoken["default"](_afterNode);
              _context.next = 88;
              break;
            case 86:
              this.hooks && this.hooks.beforeRenderResult.trigger(undefined, wrapper, this);
              return _context.abrupt("return", new _renderresult["default"](undefined, new _renderresult.OverflowContentError(_errorMessage2, [node], _componentId2)));
            case 88:
              _context.next = 7;
              break;
            case 90:
              this.hooks && this.hooks.beforeRenderResult.trigger(newBreakToken, wrapper, this);
              if (!this.error) {
                _context.next = 93;
                break;
              }
              return _context.abrupt("return", new _renderresult["default"](newBreakToken, new _renderresult.OverflowContentError(this.error.msg, this.error.item, this.error.componentId)));
            case 93:
              return _context.abrupt("return", new _renderresult["default"](newBreakToken));
            case 94:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function renderTo(_x, _x2, _x3) {
        return _renderTo.apply(this, arguments);
      }
      return renderTo;
    }()
  }, {
    key: "breakAt",
    value: function breakAt(node) {
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var newBreakToken = new _breaktoken["default"](node, offset);
      var breakHooks = this.hooks.onBreakToken.triggerSync(newBreakToken, undefined, node, this);
      breakHooks.forEach(function (newToken) {
        if (typeof newToken != "undefined") {
          newBreakToken = newToken;
        }
      });
      return newBreakToken;
    }
  }, {
    key: "shouldBreak",
    value: function shouldBreak(node, limiter) {
      var previousNode = (0, _dom.nodeBefore)(node, limiter);
      var parentNode = node.parentNode;
      var parentBreakBefore = (0, _dom.needsBreakBefore)(node) && parentNode && !previousNode && (0, _dom.needsBreakBefore)(parentNode);
      var doubleBreakBefore;
      if (parentBreakBefore) {
        doubleBreakBefore = node.dataset.breakBefore === parentNode.dataset.breakBefore;
      }
      return !doubleBreakBefore && (0, _dom.needsBreakBefore)(node) || (0, _dom.needsPreviousBreakAfter)(node) || (0, _dom.needsPageBreak)(node, previousNode);
    }
  }, {
    key: "forceBreak",
    value: function forceBreak() {
      this.forceRenderBreak = true;
    }
  }, {
    key: "getStart",
    value: function getStart(source, breakToken) {
      var start;
      var node = breakToken && breakToken.node;
      if (node) {
        start = node;
      } else {
        start = source.firstChild;
      }
      return start;
    }
  }, {
    key: "append",
    value: function append(node, dest, breakToken) {
      var shallow = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var rebuild = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
      var clone = (0, _dom.cloneNode)(node, !shallow);
      if (node.parentNode && (0, _dom.isElement)(node.parentNode)) {
        var parent = (0, _dom.findElement)(node.parentNode, dest);
        // Rebuild chain
        if (parent) {
          parent.appendChild(clone);
        } else if (rebuild) {
          var fragment = (0, _dom.rebuildAncestors)(node);
          parent = (0, _dom.findElement)(node.parentNode, fragment);
          if (!parent) {
            dest.appendChild(clone);
          } else if (breakToken && (0, _dom.isText)(breakToken.node) && breakToken.offset > 0) {
            clone.textContent = clone.textContent.substring(breakToken.offset);
            parent.appendChild(clone);
          } else {
            parent.appendChild(clone);
          }
          dest.appendChild(fragment);
        } else {
          dest.appendChild(clone);
        }
      } else {
        dest.appendChild(clone);
      }
      if (clone.dataset && clone.dataset.ref) {
        if (!dest.indexOfRefs) {
          dest.indexOfRefs = {};
        }
        dest.indexOfRefs[clone.dataset.ref] = clone;
      }
      var nodeHooks = this.hooks.renderNode.triggerSync(clone, node, this);
      nodeHooks.forEach(function (newNode) {
        if (typeof newNode != "undefined") {
          clone = newNode;
        }
      });
      return clone;
    }
  }, {
    key: "rebuildTableFromBreakToken",
    value: function rebuildTableFromBreakToken(breakToken, dest) {
      if (!breakToken || !breakToken.node) {
        return;
      }
      var node = breakToken.node;
      var td = (0, _dom.isElement)(node) ? node.closest("td") : node.parentElement.closest("td");
      if (td) {
        var rendered = (0, _dom.findElement)(td, dest, true);
        if (!rendered) {
          return;
        }
        while (td = td.nextElementSibling) {
          this.append(td, dest, null, true);
        }
      }
    }
  }, {
    key: "waitForImages",
    value: function () {
      var _waitForImages = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(imgs) {
        var _this = this;
        var results;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              results = Array.from(imgs).map(/*#__PURE__*/function () {
                var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(img) {
                  return _regenerator["default"].wrap(function _callee2$(_context2) {
                    while (1) switch (_context2.prev = _context2.next) {
                      case 0:
                        return _context2.abrupt("return", _this.awaitImageLoaded(img));
                      case 1:
                      case "end":
                        return _context2.stop();
                    }
                  }, _callee2);
                }));
                return function (_x5) {
                  return _ref.apply(this, arguments);
                };
              }());
              _context3.next = 3;
              return Promise.all(results);
            case 3:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function waitForImages(_x4) {
        return _waitForImages.apply(this, arguments);
      }
      return waitForImages;
    }()
  }, {
    key: "awaitImageLoaded",
    value: function () {
      var _awaitImageLoaded = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(image) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt("return", new Promise(function (resolve) {
                if (image.complete !== true) {
                  image.onload = function () {
                    var _window$getComputedSt = window.getComputedStyle(image),
                      width = _window$getComputedSt.width,
                      height = _window$getComputedSt.height;
                    resolve(width, height);
                  };
                  image.onerror = function (e) {
                    var _window$getComputedSt2 = window.getComputedStyle(image),
                      width = _window$getComputedSt2.width,
                      height = _window$getComputedSt2.height;
                    resolve(width, height, e);
                  };
                } else {
                  var _window$getComputedSt3 = window.getComputedStyle(image),
                    width = _window$getComputedSt3.width,
                    height = _window$getComputedSt3.height;
                  resolve(width, height);
                }
              }));
            case 1:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      function awaitImageLoaded(_x6) {
        return _awaitImageLoaded.apply(this, arguments);
      }
      return awaitImageLoaded;
    }()
  }, {
    key: "avoidBreakInside",
    value: function avoidBreakInside(node, limiter) {
      var breakNode;
      if (node === limiter) {
        return;
      }
      while (node.parentNode) {
        node = node.parentNode;
        if (node === limiter) {
          break;
        }
        if (window.getComputedStyle(node)["break-inside"] === "avoid") {
          breakNode = node;
          break;
        }
      }
      return breakNode;
    }
  }, {
    key: "createBreakToken",
    value: function createBreakToken(overflow, rendered, source) {
      var container = overflow.startContainer;
      var offset = overflow.startOffset;
      var node, renderedNode, parent, index, temp;
      if ((0, _dom.isElement)(container)) {
        temp = (0, _dom.child)(container, offset);
        if ((0, _dom.isElement)(temp)) {
          renderedNode = (0, _dom.findElement)(temp, rendered);
          if (!renderedNode) {
            // Find closest element with data-ref
            var prevNode = (0, _dom.prevValidNode)(temp);
            if (!(0, _dom.isElement)(prevNode)) {
              prevNode = prevNode.parentElement;
            }
            renderedNode = (0, _dom.findElement)(prevNode, rendered);
            // Check if temp is the last rendered node at its level.
            if (!temp.nextSibling) {
              // We need to ensure that the previous sibling of temp is fully rendered.
              var renderedNodeFromSource = (0, _dom.findElement)(renderedNode, source);
              var walker = document.createTreeWalker(renderedNodeFromSource, NodeFilter.SHOW_ELEMENT);
              var lastChildOfRenderedNodeFromSource = walker.lastChild();
              var lastChildOfRenderedNodeMatchingFromRendered = (0, _dom.findElement)(lastChildOfRenderedNodeFromSource, rendered);
              // Check if we found that the last child in source
              if (!lastChildOfRenderedNodeMatchingFromRendered) {
                // Pending content to be rendered before virtual break token
                return;
              }
              // Otherwise we will return a break token as per below
            }
            // renderedNode is actually the last unbroken box that does not overflow.
            // Break Token is therefore the next sibling of renderedNode within source node.
            node = (0, _dom.findElement)(renderedNode, source).nextSibling;
            offset = 0;
          } else {
            node = (0, _dom.findElement)(renderedNode, source);
            offset = 0;
          }
        } else {
          renderedNode = (0, _dom.findElement)(container, rendered);
          if (!renderedNode) {
            renderedNode = (0, _dom.findElement)((0, _dom.prevValidNode)(container), rendered);
          }
          parent = (0, _dom.findElement)(renderedNode, source);
          index = (0, _dom.indexOfTextNode)(temp, parent);
          // No seperatation for the first textNode of an element
          if (index === 0) {
            node = parent;
            offset = 0;
          } else {
            node = (0, _dom.child)(parent, index);
            offset = 0;
          }
        }
      } else {
        renderedNode = (0, _dom.findElement)(container.parentNode, rendered);
        if (!renderedNode) {
          renderedNode = (0, _dom.findElement)((0, _dom.prevValidNode)(container.parentNode), rendered);
        }
        parent = (0, _dom.findElement)(renderedNode, source);
        index = (0, _dom.indexOfTextNode)(container, parent);
        if (index === -1) {
          return;
        }
        node = (0, _dom.child)(parent, index);
        offset += node.textContent.indexOf(container.textContent);
      }
      if (!node) {
        return;
      }
      return new _breaktoken["default"](node, offset);
    }
  }, {
    key: "findBreakToken",
    value: function findBreakToken(rendered, source) {
      var bounds = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.bounds;
      var prevBreakToken = arguments.length > 3 ? arguments[3] : undefined;
      var extract = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
      var overflow = this.findOverflow(rendered, bounds);
      var breakToken, breakLetter;
      var overflowHooks = this.hooks.onOverflow.triggerSync(overflow, rendered, bounds, this);
      overflowHooks.forEach(function (newOverflow) {
        if (typeof newOverflow != "undefined") {
          overflow = newOverflow;
        }
      });
      if (overflow) {
        breakToken = this.createBreakToken(overflow, rendered, source);
        // breakToken is nullable
        var breakHooks = this.hooks.onBreakToken.triggerSync(breakToken, overflow, rendered, this);
        breakHooks.forEach(function (newToken) {
          if (typeof newToken != "undefined") {
            breakToken = newToken;
          }
        });

        // Stop removal if we are in a loop
        if (breakToken && breakToken.equals(prevBreakToken)) {
          return breakToken;
        }
        if (breakToken && breakToken["node"] && breakToken["offset"] && breakToken["node"].textContent) {
          breakLetter = breakToken["node"].textContent.charAt(breakToken["offset"]);
        } else {
          breakLetter = undefined;
        }
        if (breakToken && breakToken.node && extract) {
          var removed = this.removeOverflow(overflow, breakLetter);
          this.hooks && this.hooks.afterOverflowRemoved.trigger(removed, rendered, this);
        }
      }
      return breakToken;
    }
  }, {
    key: "hasOverflow",
    value: function hasOverflow(element) {
      var bounds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.bounds;
      var constrainingElement = element && element.parentNode; // this gets the element, instead of the wrapper for the width workaround
      var _element$getBoundingC = element.getBoundingClientRect(),
        width = _element$getBoundingC.width,
        height = _element$getBoundingC.height;
      var scrollWidth = constrainingElement ? constrainingElement.scrollWidth : 0;
      var scrollHeight = constrainingElement ? constrainingElement.scrollHeight : 0;
      return Math.max(Math.floor(width), scrollWidth) > Math.round(bounds.width) || Math.max(Math.floor(height), scrollHeight) > Math.round(bounds.height);
    }
  }, {
    key: "findOverflow",
    value: function findOverflow(rendered) {
      var bounds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.bounds;
      var gap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.gap;
      if (!this.hasOverflow(rendered, bounds)) return;
      var start = Math.floor(bounds.left);
      var end = Math.round(bounds.right + gap);
      var vStart = Math.round(bounds.top);
      var vEnd = Math.round(bounds.bottom);
      var range;
      var walker = (0, _dom.walk)(rendered.firstChild, rendered);

      // Find Start
      var next, done, node, offset, skip, breakAvoid, prev, br;
      while (!done) {
        next = walker.next();
        done = next.done;
        node = next.value;
        skip = false;
        breakAvoid = false;
        prev = undefined;
        br = undefined;
        if (node) {
          var pos = (0, _utils.getBoundingClientRect)(node);
          var left = Math.round(pos.left);
          var right = Math.floor(pos.right);
          var top = Math.round(pos.top);
          var bottom = Math.floor(pos.bottom);
          if (!range && (left >= end || top >= vEnd)) {
            // Check if it is a float
            var isFloat = false;

            // Check if the node is inside a break-inside: avoid table cell
            var insideTableCell = (0, _dom.parentOf)(node, "TD", rendered);
            if (insideTableCell && window.getComputedStyle(insideTableCell)["break-inside"] === "avoid") {
              // breaking inside a table cell produces unexpected result, as a workaround, we forcibly avoid break inside in a cell.
              // But we take the whole row, not just the cell that is causing the break.
              prev = insideTableCell.parentElement;
            } else if ((0, _dom.isElement)(node)) {
              var styles = window.getComputedStyle(node);
              isFloat = styles.getPropertyValue("float") !== "none";
              skip = styles.getPropertyValue("break-inside") === "avoid";
              breakAvoid = node.dataset.breakBefore === "avoid" || node.dataset.previousBreakAfter === "avoid";
              prev = breakAvoid && (0, _dom.nodeBefore)(node, rendered);
              br = node.tagName === "BR" || node.tagName === "WBR";
            }
            var tableRow = void 0;
            if (node.nodeName === "TR") {
              tableRow = node;
            } else {
              tableRow = (0, _dom.parentOf)(node, "TR", rendered);
            }
            if (tableRow) {
              // honor break-inside="avoid" in parent tbody/thead
              var container = tableRow.parentElement;
              if (["TBODY", "THEAD"].includes(container.nodeName)) {
                var _styles = window.getComputedStyle(container);
                if (_styles.getPropertyValue("break-inside") === "avoid") prev = container;
              }

              // Check if the node is inside a row with a rowspan
              var table = (0, _dom.parentOf)(tableRow, "TABLE", rendered);
              var rowspan = table.querySelector("[colspan]");
              if (table && rowspan) {
                var columnCount = 0;
                for (var _i = 0, _Array$from = Array.from(table.rows[0].cells); _i < _Array$from.length; _i++) {
                  var cell = _Array$from[_i];
                  columnCount += parseInt(cell.getAttribute("colspan") || "1");
                }
                if (tableRow.cells.length !== columnCount) {
                  var previousRow = tableRow.previousElementSibling;
                  var previousRowColumnCount = void 0;
                  while (previousRow !== null) {
                    previousRowColumnCount = 0;
                    for (var _i2 = 0, _Array$from2 = Array.from(previousRow.cells); _i2 < _Array$from2.length; _i2++) {
                      var _cell = _Array$from2[_i2];
                      previousRowColumnCount += parseInt(_cell.getAttribute("colspan") || "1");
                    }
                    if (previousRowColumnCount === columnCount) {
                      break;
                    }
                    previousRow = previousRow.previousElementSibling;
                  }
                  if (previousRowColumnCount === columnCount) {
                    prev = previousRow;
                  }
                }
              }
            }
            if (prev) {
              range = document.createRange();
              range.selectNode(prev);
              break;
            }
            if (!br && !isFloat && (0, _dom.isElement)(node)) {
              range = document.createRange();
              range.selectNode(node);
              break;
            }
            if ((0, _dom.isText)(node) && node.textContent.trim().length) {
              range = document.createRange();
              range.selectNode(node);
              break;
            }
          }
          if (!range && (0, _dom.isText)(node) && node.textContent.trim().length && !(0, _dom.breakInsideAvoidParentNode)(node.parentNode)) {
            var rects = (0, _utils.getClientRects)(node);
            var rect = void 0;
            left = 0;
            top = 0;
            for (var i = 0; i != rects.length; i++) {
              rect = rects[i];
              if (rect.width > 0 && (!left || rect.left > left)) {
                left = rect.left;
              }
              if (rect.height > 0 && (!top || rect.top > top)) {
                top = rect.top;
              }
            }
            if (left >= end || top >= vEnd) {
              range = document.createRange();
              offset = this.textBreak(node, start, end, vStart, vEnd);
              if (!offset) {
                range = undefined;
              } else {
                range.setStart(node, offset);
              }
              break;
            }
          }

          // Skip children
          if (skip || right <= end && bottom <= vEnd) {
            next = (0, _dom.nodeAfter)(node, rendered);
            if (next) {
              walker = (0, _dom.walk)(next, rendered);
            }
          }
        }
      }

      // Find End
      if (range) {
        range.setEndAfter(rendered.lastChild);
        return range;
      }
    }
  }, {
    key: "findEndToken",
    value: function findEndToken(rendered, source) {
      if (rendered.childNodes.length === 0) {
        return;
      }
      var lastChild = rendered.lastChild;
      var lastNodeIndex;
      while (lastChild && lastChild.lastChild) {
        if (!(0, _dom.validNode)(lastChild)) {
          // Only get elements with refs
          lastChild = lastChild.previousSibling;
        } else if (!(0, _dom.validNode)(lastChild.lastChild)) {
          // Deal with invalid dom items
          lastChild = (0, _dom.prevValidNode)(lastChild.lastChild);
          break;
        } else {
          lastChild = lastChild.lastChild;
        }
      }
      if ((0, _dom.isText)(lastChild)) {
        if (lastChild.parentNode.dataset.ref) {
          lastNodeIndex = (0, _dom.indexOf)(lastChild);
          lastChild = lastChild.parentNode;
        } else {
          lastChild = lastChild.previousSibling;
        }
      }
      var original = (0, _dom.findElement)(lastChild, source);
      if (lastNodeIndex) {
        original = original.childNodes[lastNodeIndex];
      }
      var after = (0, _dom.nodeAfter)(original);
      return this.breakAt(after);
    }
  }, {
    key: "textBreak",
    value: function textBreak(node, start, end, vStart, vEnd) {
      var wordwalker = (0, _dom.words)(node);
      var left = 0;
      var right = 0;
      var top = 0;
      var bottom = 0;
      var word, next, done, pos;
      var offset;
      while (!done) {
        next = wordwalker.next();
        word = next.value;
        done = next.done;
        if (!word) {
          break;
        }
        pos = (0, _utils.getBoundingClientRect)(word);
        left = Math.floor(pos.left);
        right = Math.floor(pos.right);
        top = Math.floor(pos.top);
        bottom = Math.floor(pos.bottom);
        if (left >= end || top >= vEnd) {
          offset = word.startOffset;
          break;
        }
        if (right > end || bottom > vEnd) {
          var letterwalker = (0, _dom.letters)(word);
          var letter = void 0,
            nextLetter = void 0,
            doneLetter = void 0;
          while (!doneLetter) {
            nextLetter = letterwalker.next();
            letter = nextLetter.value;
            doneLetter = nextLetter.done;
            if (!letter) {
              break;
            }
            pos = (0, _utils.getBoundingClientRect)(letter);
            left = Math.floor(pos.left);
            top = Math.floor(pos.top);
            if (left >= end || top >= vEnd) {
              offset = letter.startOffset;
              done = true;
              break;
            }
          }
        }
      }
      return offset;
    }
  }, {
    key: "removeOverflow",
    value: function removeOverflow(overflow, breakLetter) {
      var startContainer = overflow.startContainer;
      var extracted = overflow.extractContents();
      this.hyphenateAtBreak(startContainer, breakLetter);
      return extracted;
    }
  }, {
    key: "hyphenateAtBreak",
    value: function hyphenateAtBreak(startContainer, breakLetter) {
      if ((0, _dom.isText)(startContainer)) {
        var startText = startContainer.textContent;
        var prevLetter = startText[startText.length - 1];

        // Add a hyphen if previous character is a letter or soft hyphen
        if (breakLetter && /^\w|\u00AD$/.test(prevLetter) && /^\w|\u00AD$/.test(breakLetter) || !breakLetter && /^\w|\u00AD$/.test(prevLetter)) {
          startContainer.parentNode.classList.add("pagedjs_hyphen");
          startContainer.textContent += this.settings.hyphenGlyph || "\u2011";
        }
      }
    }
  }, {
    key: "equalTokens",
    value: function equalTokens(a, b) {
      if (!a || !b) {
        return false;
      }
      if (a["node"] && b["node"] && a["node"] !== b["node"]) {
        return false;
      }
      if (a["offset"] && b["offset"] && a["offset"] !== b["offset"]) {
        return false;
      }
      return true;
    }
  }]);
}();
(0, _eventEmitter["default"])(Layout.prototype);
var _default = exports["default"] = Layout;