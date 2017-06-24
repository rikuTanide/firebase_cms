"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React = require("react");
var server_1 = require("react-dom/server");
var IndexComponent = (function (_super) {
    __extends(IndexComponent, _super);
    function IndexComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IndexComponent.prototype.render = function () {
        return (React.createElement("div", null, "Hello SSR!!"));
    };
    IndexComponent.toString = function () {
        return server_1.renderToString(React.createElement(IndexComponent, null));
    };
    return IndexComponent;
}(React.Component));
exports.IndexComponent = IndexComponent;
