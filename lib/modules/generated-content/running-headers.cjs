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
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var RunningHeaders = /*#__PURE__*/function (_Handler) {
  function RunningHeaders(chunker, polisher, caller) {
    var _this;
    (0, _classCallCheck2["default"])(this, RunningHeaders);
    _this = _callSuper(this, RunningHeaders, [chunker, polisher, caller]);
    _this.runningSelectors = {};
    _this.elements = {};
    return _this;
  }
  (0, _inherits2["default"])(RunningHeaders, _Handler);
  return (0, _createClass2["default"])(RunningHeaders, [{
    key: "onDeclaration",
    value: function onDeclaration(declaration, dItem, dList, rule) {
      var _this2 = this;
      if (declaration.property === "position") {
        var selector = _cssTree["default"].generate(rule.ruleNode.prelude);
        var identifier = declaration.value.children.first().name;
        if (identifier === "running") {
          var value;
          _cssTree["default"].walk(declaration, {
            visit: "Function",
            enter: function enter(node, item, list) {
              value = node.children.first().name;
            }
          });
          this.runningSelectors[value] = {
            identifier: identifier,
            value: value,
            selector: selector
          };
        }
      }
      if (declaration.property === "content") {
        _cssTree["default"].walk(declaration, {
          visit: "Function",
          enter: function enter(funcNode, fItem, fList) {
            if (funcNode.name.indexOf("element") > -1) {
              var _selector = _cssTree["default"].generate(rule.ruleNode.prelude);
              var func = funcNode.name;
              var _value = funcNode.children.first().name;
              var args = [_value];

              // we only handle first for now
              var style = "first";
              _selector.split(",").forEach(function (s) {
                // remove before / after
                s = s.replace(/::after|::before/, "");
                _this2.elements[s] = {
                  func: func,
                  args: args,
                  value: _value,
                  style: style || "first",
                  selector: s,
                  fullSelector: _selector
                };
              });
            }
          }
        });
      }
    }
  }, {
    key: "afterParsed",
    value: function afterParsed(fragment) {
      for (var _i = 0, _Object$keys = Object.keys(this.runningSelectors); _i < _Object$keys.length; _i++) {
        var name = _Object$keys[_i];
        var set = this.runningSelectors[name];
        var selected = Array.from(fragment.querySelectorAll(set.selector));
        if (set.identifier === "running") {
          var _iterator = _createForOfIteratorHelper(selected),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var header = _step.value;
              header.style.display = "none";
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
      }
    }
  }, {
    key: "afterPageLayout",
    value: function afterPageLayout(fragment) {
      for (var _i2 = 0, _Object$keys2 = Object.keys(this.runningSelectors); _i2 < _Object$keys2.length; _i2++) {
        var name = _Object$keys2[_i2];
        var set = this.runningSelectors[name];
        var selected = fragment.querySelector(set.selector);
        if (selected) {
          // let cssVar;
          if (set.identifier === "running") {
            // cssVar = selected.textContent.replace(/\\([\s\S])|(["|'])/g,"\\$1$2");
            // this.styleSheet.insertRule(`:root { --string-${name}: "${cssVar}"; }`, this.styleSheet.cssRules.length);
            // fragment.style.setProperty(`--string-${name}`, `"${cssVar}"`);
            set.first = selected;
          } else {
            console.warn(set.value + "needs css replacement");
          }
        }
      }

      // move elements
      if (!this.orderedSelectors) {
        this.orderedSelectors = this.orderSelectors(this.elements);
      }
      var _iterator2 = _createForOfIteratorHelper(this.orderedSelectors),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var selector = _step2.value;
          if (selector) {
            var el = this.elements[selector];
            var _selected = fragment.querySelector(selector);
            if (_selected) {
              var running = this.runningSelectors[el.args[0]];
              if (running && running.first) {
                _selected.innerHTML = ""; // Clear node
                // selected.classList.add("pagedjs_clear-after"); // Clear ::after
                var clone = running.first.cloneNode(true);
                clone.style.display = null;
                _selected.appendChild(clone);
              }
            }
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }

    /**
    * Assign a weight to @page selector classes
    * 1) page
    * 2) left & right
    * 3) blank
    * 4) first & nth
    * 5) named page
    * 6) named left & right
    * 7) named first & nth
    * @param {string} [s] selector string
    * @return {int} weight
    */
  }, {
    key: "pageWeight",
    value: function pageWeight(s) {
      var weight = 1;
      var selector = s.split(" ");
      var parts = selector.length && selector[0].split(".");
      parts.shift(); // remove empty first part

      switch (parts.length) {
        case 4:
          if (/^pagedjs_[\w-]+_first_page$/.test(parts[3])) {
            weight = 7;
          } else if (parts[3] === "pagedjs_left_page" || parts[3] === "pagedjs_right_page") {
            weight = 6;
          }
          break;
        case 3:
          if (parts[1] === "pagedjs_named_page") {
            if (parts[2].indexOf(":nth-of-type") > -1) {
              weight = 7;
            } else {
              weight = 5;
            }
          }
          break;
        case 2:
          if (parts[1] === "pagedjs_first_page") {
            weight = 4;
          } else if (parts[1] === "pagedjs_blank_page") {
            weight = 3;
          } else if (parts[1] === "pagedjs_left_page" || parts[1] === "pagedjs_right_page") {
            weight = 2;
          }
          break;
        default:
          if (parts[0].indexOf(":nth-of-type") > -1) {
            weight = 4;
          } else {
            weight = 1;
          }
      }
      return weight;
    }

    /**
    * Orders the selectors based on weight
    *
    * Does not try to deduplicate base on specifity of the selector
    * Previous matched selector will just be overwritten
    * @param {obj} [obj] selectors object
    * @return {Array} orderedSelectors
    */
  }, {
    key: "orderSelectors",
    value: function orderSelectors(obj) {
      var selectors = Object.keys(obj);
      var weighted = {
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: []
      };
      var orderedSelectors = [];
      for (var _i3 = 0, _selectors = selectors; _i3 < _selectors.length; _i3++) {
        var s = _selectors[_i3];
        var w = this.pageWeight(s);
        weighted[w].unshift(s);
      }
      for (var i = 1; i <= 7; i++) {
        orderedSelectors = orderedSelectors.concat(weighted[i]);
      }
      return orderedSelectors;
    }
  }, {
    key: "beforeTreeParse",
    value: function beforeTreeParse(text, sheet) {
      // element(x) is parsed as image element selector, so update element to element-ident
      sheet.text = text.replace(/element[\s]*\(([^|^#)]*)\)/g, "element-ident($1)");
    }
  }]);
}(_handler["default"]);
var _default = exports["default"] = RunningHeaders;