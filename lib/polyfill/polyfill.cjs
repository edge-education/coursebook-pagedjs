"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _previewer = _interopRequireDefault(require("./previewer.cjs"));
var Paged = _interopRequireWildcard(require("../index.cjs"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
window.Paged = Paged;
var ready = new Promise(function (resolve, reject) {
  if (document.readyState === "interactive" || document.readyState === "complete") {
    resolve(document.readyState);
    return;
  }
  document.onreadystatechange = function ($) {
    if (document.readyState === "interactive") {
      resolve(document.readyState);
    }
  };
});
var config = window.PagedConfig || {
  auto: true,
  before: undefined,
  after: undefined,
  content: undefined,
  stylesheets: undefined,
  renderTo: undefined,
  settings: undefined
};
var previewer = new _previewer["default"](config.settings);
ready.then(/*#__PURE__*/(0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee() {
  var done;
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        if (!config.before) {
          _context.next = 3;
          break;
        }
        _context.next = 3;
        return config.before();
      case 3:
        if (!(config.auto !== false)) {
          _context.next = 7;
          break;
        }
        _context.next = 6;
        return previewer.preview(config.content, config.stylesheets, config.renderTo);
      case 6:
        done = _context.sent;
      case 7:
        if (!config.after) {
          _context.next = 10;
          break;
        }
        _context.next = 10;
        return config.after(done);
      case 10:
      case "end":
        return _context.stop();
    }
  }, _callee);
})));
var _default = exports["default"] = previewer;