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
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var Lists = /*#__PURE__*/function (_Handler) {
  function Lists(chunker, polisher, caller) {
    (0, _classCallCheck2["default"])(this, Lists);
    return _callSuper(this, Lists, [chunker, polisher, caller]);
  }
  (0, _inherits2["default"])(Lists, _Handler);
  return (0, _createClass2["default"])(Lists, [{
    key: "afterParsed",
    value: function afterParsed(content) {
      var orderedLists = content.querySelectorAll("ol");
      var _iterator = _createForOfIteratorHelper(orderedLists),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var list = _step.value;
          this.addDataNumbers(list);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "afterPageLayout",
    value: function afterPageLayout(pageElement, page, breakToken, chunker) {
      var orderedLists = pageElement.getElementsByTagName("ol");
      var _iterator2 = _createForOfIteratorHelper(orderedLists),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var list = _step2.value;
          if (list.firstElementChild) {
            list.start = list.firstElementChild.dataset.itemNum;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }, {
    key: "addDataNumbers",
    value: function addDataNumbers(list) {
      var start = 1;
      if (list.hasAttribute("start")) {
        start = parseInt(list.getAttribute("start"), 10);
        if (isNaN(start)) {
          start = 1;
        }
      }
      var items = list.children;
      for (var i = 0; i < items.length; i++) {
        items[i].setAttribute("data-item-num", i + start);
      }
    }
  }]);
}(_handler["default"]);
var _default = exports["default"] = Lists;