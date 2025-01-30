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
var _cssTree = _interopRequireDefault(require("css-tree"));
var _utils = require("../../utils/utils.cjs");
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var Following = /*#__PURE__*/function (_Handler) {
  function Following(chunker, polisher, caller) {
    var _this;
    (0, _classCallCheck2["default"])(this, Following);
    _this = _callSuper(this, Following, [chunker, polisher, caller]);
    _this.styleSheet = polisher.styleSheet;
    _this.selectors = {};
    return _this;
  }
  (0, _inherits2["default"])(Following, _Handler);
  return (0, _createClass2["default"])(Following, [{
    key: "onRule",
    value: function onRule(ruleNode, ruleItem, rulelist) {
      var _this2 = this;
      var selector = _cssTree["default"].generate(ruleNode.prelude);
      if (selector.match(/\+/)) {
        var declarations = _cssTree["default"].generate(ruleNode.block);
        declarations = declarations.replace(/[{}]/g, "");
        var uuid = "following-" + (0, _utils.UUID)();
        selector.split(",").forEach(function (s) {
          if (!_this2.selectors[s]) {
            _this2.selectors[s] = [uuid, declarations];
          } else {
            _this2.selectors[s][1] = "".concat(_this2.selectors[s][1], ";").concat(declarations);
          }
        });
        rulelist.remove(ruleItem);
      }
    }
  }, {
    key: "afterParsed",
    value: function afterParsed(parsed) {
      this.processSelectors(parsed, this.selectors);
    }
  }, {
    key: "processSelectors",
    value: function processSelectors(parsed, selectors) {
      // add the new attributes to matching elements
      for (var s in selectors) {
        var elements = parsed.querySelectorAll(s);
        for (var i = 0; i < elements.length; i++) {
          var dataFollowing = elements[i].getAttribute("data-following");
          if (dataFollowing && dataFollowing != "") {
            dataFollowing = "".concat(dataFollowing, ",").concat(selectors[s][0]);
            elements[i].setAttribute("data-following", dataFollowing);
          } else {
            elements[i].setAttribute("data-following", selectors[s][0]);
          }
        }
        var rule = "*[data-following*='".concat(selectors[s][0], "'] { ").concat(selectors[s][1], "; }");
        this.styleSheet.insertRule(rule, this.styleSheet.cssRules.length);
      }
    }
  }]);
}(_handler["default"]);
var _default = exports["default"] = Following;