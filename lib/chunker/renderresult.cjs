"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.OverflowContentError = void 0;
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
/**
 * Render result.
 * @class
 */
var RenderResult = /*#__PURE__*/(0, _createClass2["default"])(function RenderResult(breakToken, error) {
  (0, _classCallCheck2["default"])(this, RenderResult);
  this.breakToken = breakToken;
  this.error = error;
});
var OverflowContentError = exports.OverflowContentError = /*#__PURE__*/function (_Error) {
  function OverflowContentError(message, items) {
    var _this;
    (0, _classCallCheck2["default"])(this, OverflowContentError);
    _this = _callSuper(this, OverflowContentError, [message]);
    _this.items = items;
    return _this;
  }
  (0, _inherits2["default"])(OverflowContentError, _Error);
  return (0, _createClass2["default"])(OverflowContentError);
}(/*#__PURE__*/(0, _wrapNativeSuper2["default"])(Error));
var _default = exports["default"] = RenderResult;