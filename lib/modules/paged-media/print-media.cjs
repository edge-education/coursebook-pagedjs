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
var PrintMedia = /*#__PURE__*/function (_Handler) {
  function PrintMedia(chunker, polisher, caller) {
    (0, _classCallCheck2["default"])(this, PrintMedia);
    return _callSuper(this, PrintMedia, [chunker, polisher, caller]);
  }
  (0, _inherits2["default"])(PrintMedia, _Handler);
  return (0, _createClass2["default"])(PrintMedia, [{
    key: "onAtMedia",
    value: function onAtMedia(node, item, list) {
      var media = this.getMediaName(node);
      var rules;
      if (media.includes("print")) {
        rules = node.block.children;

        // Append rules to the end of main rules list
        // TODO: this isn't working right, needs to check what is in the prelude
        /*
        rules.forEach((selectList) => {
        	if (selectList.prelude) {
        		selectList.prelude.children.forEach((rule) => {
        				rule.children.prependData({
        				type: "Combinator",
        				name: " "
        			});
        					rule.children.prependData({
        				type: "ClassSelector",
        				name: "pagedjs_page"
        			});
        		});	
        	}
        });
        	list.insertList(rules, item);
        */

        // Append rules to the end of main rules list
        list.appendList(rules);

        // Remove rules from the @media block
        list.remove(item);
      } else if (!media.includes("all") && !media.includes("pagedjs-ignore")) {
        list.remove(item);
      }
    }
  }, {
    key: "getMediaName",
    value: function getMediaName(node) {
      var media = [];
      if (typeof node.prelude === "undefined" || node.prelude.type !== "AtrulePrelude") {
        return;
      }
      _cssTree["default"].walk(node.prelude, {
        visit: "Identifier",
        enter: function enter(identNode, iItem, iList) {
          media.push(identNode.name);
        }
      });
      return media;
    }
  }]);
}(_handler["default"]);
var _default = exports["default"] = PrintMedia;