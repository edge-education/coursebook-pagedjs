"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _handler = _interopRequireDefault(require("../handler.cjs"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var ScriptsFilter = /*#__PURE__*/function (_Handler) {
  function ScriptsFilter(chunker, polisher, caller) {
    (0, _classCallCheck2["default"])(this, ScriptsFilter);
    return _callSuper(this, ScriptsFilter, [chunker, polisher, caller]);
  }
  (0, _inherits2["default"])(ScriptsFilter, _Handler);
  return (0, _createClass2["default"])(ScriptsFilter, [{
    key: "filter",
    value: function filter(content) {
      content.querySelectorAll("script").forEach(function (script) {
        script.remove();
      });
    }
  }]);
}(_handler["default"]);
var _default = exports["default"] = ScriptsFilter;