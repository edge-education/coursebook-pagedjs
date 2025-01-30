"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _sheet = _interopRequireDefault(require("./sheet.cjs"));
var _base = _interopRequireDefault(require("./base.cjs"));
var _hook = _interopRequireDefault(require("../utils/hook.cjs"));
var _request = _interopRequireDefault(require("../utils/request.cjs"));
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var Polisher = /*#__PURE__*/function () {
  function Polisher(setup) {
    (0, _classCallCheck2["default"])(this, Polisher);
    this.sheets = [];
    this.inserted = [];
    this.hooks = {};
    this.hooks.onUrl = new _hook["default"](this);
    this.hooks.onAtPage = new _hook["default"](this);
    this.hooks.onAtMedia = new _hook["default"](this);
    this.hooks.onRule = new _hook["default"](this);
    this.hooks.onDeclaration = new _hook["default"](this);
    this.hooks.onContent = new _hook["default"](this);
    this.hooks.onSelector = new _hook["default"](this);
    this.hooks.onPseudoSelector = new _hook["default"](this);
    this.hooks.onImport = new _hook["default"](this);
    this.hooks.beforeTreeParse = new _hook["default"](this);
    this.hooks.beforeTreeWalk = new _hook["default"](this);
    this.hooks.afterTreeWalk = new _hook["default"](this);
    if (setup !== false) {
      this.setup();
    }
  }
  return (0, _createClass2["default"])(Polisher, [{
    key: "setup",
    value: function setup() {
      this.base = this.insert(_base["default"]);
      this.styleEl = document.createElement("style");
      document.head.appendChild(this.styleEl);
      this.styleSheet = this.styleEl.sheet;
      return this.styleSheet;
    }
  }, {
    key: "add",
    value: function () {
      var _add = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var _arguments = arguments,
          _this = this;
        var fetched,
          urls,
          i,
          f,
          _loop,
          url,
          _args3 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              fetched = [];
              urls = [];
              i = 0;
            case 3:
              if (!(i < _args3.length)) {
                _context3.next = 21;
                break;
              }
              f = void 0;
              if (!((0, _typeof2["default"])(_args3[i]) === "object")) {
                _context3.next = 15;
                break;
              }
              _loop = /*#__PURE__*/_regenerator["default"].mark(function _loop(url) {
                var obj;
                return _regenerator["default"].wrap(function _loop$(_context) {
                  while (1) switch (_context.prev = _context.next) {
                    case 0:
                      obj = _arguments[i];
                      f = new Promise(function (resolve, reject) {
                        urls.push(url);
                        resolve(obj[url]);
                      });
                    case 2:
                    case "end":
                      return _context.stop();
                  }
                }, _loop);
              });
              _context3.t0 = _regenerator["default"].keys(_args3[i]);
            case 8:
              if ((_context3.t1 = _context3.t0()).done) {
                _context3.next = 13;
                break;
              }
              url = _context3.t1.value;
              return _context3.delegateYield(_loop(url), "t2", 11);
            case 11:
              _context3.next = 8;
              break;
            case 13:
              _context3.next = 17;
              break;
            case 15:
              urls.push(_args3[i]);
              f = (0, _request["default"])(_args3[i]).then(function (response) {
                return response.text();
              });
            case 17:
              fetched.push(f);
            case 18:
              i++;
              _context3.next = 3;
              break;
            case 21:
              _context3.next = 23;
              return Promise.all(fetched).then(/*#__PURE__*/function () {
                var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(originals) {
                  var text, index;
                  return _regenerator["default"].wrap(function _callee$(_context2) {
                    while (1) switch (_context2.prev = _context2.next) {
                      case 0:
                        text = "";
                        index = 0;
                      case 2:
                        if (!(index < originals.length)) {
                          _context2.next = 10;
                          break;
                        }
                        _context2.next = 5;
                        return _this.convertViaSheet(originals[index], urls[index]);
                      case 5:
                        text = _context2.sent;
                        _this.insert(text);
                      case 7:
                        index++;
                        _context2.next = 2;
                        break;
                      case 10:
                        return _context2.abrupt("return", text);
                      case 11:
                      case "end":
                        return _context2.stop();
                    }
                  }, _callee);
                }));
                return function (_x) {
                  return _ref.apply(this, arguments);
                };
              }());
            case 23:
              return _context3.abrupt("return", _context3.sent);
            case 24:
            case "end":
              return _context3.stop();
          }
        }, _callee2);
      }));
      function add() {
        return _add.apply(this, arguments);
      }
      return add;
    }()
  }, {
    key: "convertViaSheet",
    value: function () {
      var _convertViaSheet = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(cssStr, href) {
        var sheet, _iterator, _step, url, str, text;
        return _regenerator["default"].wrap(function _callee3$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              sheet = new _sheet["default"](href, this.hooks);
              _context4.next = 3;
              return sheet.parse(cssStr);
            case 3:
              // Insert the imported sheets first
              _iterator = _createForOfIteratorHelper(sheet.imported);
              _context4.prev = 4;
              _iterator.s();
            case 6:
              if ((_step = _iterator.n()).done) {
                _context4.next = 17;
                break;
              }
              url = _step.value;
              _context4.next = 10;
              return (0, _request["default"])(url).then(function (response) {
                return response.text();
              });
            case 10:
              str = _context4.sent;
              _context4.next = 13;
              return this.convertViaSheet(str, url);
            case 13:
              text = _context4.sent;
              this.insert(text);
            case 15:
              _context4.next = 6;
              break;
            case 17:
              _context4.next = 22;
              break;
            case 19:
              _context4.prev = 19;
              _context4.t0 = _context4["catch"](4);
              _iterator.e(_context4.t0);
            case 22:
              _context4.prev = 22;
              _iterator.f();
              return _context4.finish(22);
            case 25:
              this.sheets.push(sheet);
              if (typeof sheet.width !== "undefined") {
                this.width = sheet.width;
              }
              if (typeof sheet.height !== "undefined") {
                this.height = sheet.height;
              }
              if (typeof sheet.orientation !== "undefined") {
                this.orientation = sheet.orientation;
              }
              return _context4.abrupt("return", sheet.toString());
            case 30:
            case "end":
              return _context4.stop();
          }
        }, _callee3, this, [[4, 19, 22, 25]]);
      }));
      function convertViaSheet(_x2, _x3) {
        return _convertViaSheet.apply(this, arguments);
      }
      return convertViaSheet;
    }()
  }, {
    key: "insert",
    value: function insert(text) {
      var head = document.querySelector("head");
      var style = document.createElement("style");
      style.setAttribute("data-pagedjs-inserted-styles", "true");
      style.appendChild(document.createTextNode(text));
      head.appendChild(style);
      this.inserted.push(style);
      return style;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.styleEl.remove();
      this.inserted.forEach(function (s) {
        s.remove();
      });
      this.sheets = [];
    }
  }]);
}();
var _default = exports["default"] = Polisher;