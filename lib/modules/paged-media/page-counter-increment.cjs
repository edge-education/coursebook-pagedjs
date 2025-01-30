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
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var PageCounterIncrement = /*#__PURE__*/function (_Handler) {
  function PageCounterIncrement(chunker, polisher, caller) {
    var _this;
    (0, _classCallCheck2["default"])(this, PageCounterIncrement);
    _this = _callSuper(this, PageCounterIncrement, [chunker, polisher, caller]);
    _this.styleSheet = polisher.styleSheet;
    _this.pageCounter = {
      name: "page",
      increments: {},
      resets: {}
    };
    return _this;
  }
  (0, _inherits2["default"])(PageCounterIncrement, _Handler);
  return (0, _createClass2["default"])(PageCounterIncrement, [{
    key: "onDeclaration",
    value: function onDeclaration(declaration, dItem, dList, rule) {
      var property = declaration.property;
      if (property === "counter-increment") {
        var inc = this.handleIncrement(declaration, rule);
        if (inc) {
          dList.remove(dItem);
        }
      }
    }
  }, {
    key: "afterParsed",
    value: function afterParsed(_) {
      for (var inc in this.pageCounter.increments) {
        var increment = this.pageCounter.increments[inc];
        this.insertRule("".concat(increment.selector, " { --pagedjs-page-counter-increment: ").concat(increment.number, " }"));
      }
    }
  }, {
    key: "handleIncrement",
    value: function handleIncrement(declaration, rule) {
      var identifier = declaration.value.children.first();
      var number = declaration.value.children.getSize() > 1 ? declaration.value.children.last().value : 1;
      var name = identifier && identifier.name;
      if (name && name.indexOf("target-counter-") === 0) {
        return;
      }
      // A counter named page is automatically created and incremented by 1 on every page of the document,
      // unless the counter-increment property in the page context explicitly specifies a different increment for the page counter.
      // https://www.w3.org/TR/css-page-3/#page-based-counters
      if (name !== "page") {
        return;
      }
      // the counter-increment property is not defined on the page context (i.e. @page rule), ignoring...
      if (rule.ruleNode.name === "page" && rule.ruleNode.type === "Atrule") {
        return;
      }
      var selector = _cssTree["default"].generate(rule.ruleNode.prelude);
      return this.pageCounter.increments[selector] = {
        selector: selector,
        number: number
      };
    }
  }, {
    key: "insertRule",
    value: function insertRule(rule) {
      this.styleSheet.insertRule(rule, this.styleSheet.cssRules.length);
    }
  }]);
}(_handler["default"]);
var _default = exports["default"] = PageCounterIncrement;