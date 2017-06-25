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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var React = require("react");
var server_1 = require("react-dom/server");
var IndexComponent = (function (_super) {
    __extends(IndexComponent, _super);
    function IndexComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IndexComponent.prototype.render = function () {
        var props = this.props;
        props.tech_reviews.sort(function (a, b) { return a > b ? -1 : 1; });
        var tech_reviews = props.tech_reviews.map(function (t) {
            return React.createElement("li", { key: t.id },
                React.createElement("a", { href: "/tech_reviews/" + t.id }, t.title));
        });
        var book_reviews = props.book_reviews.map(function (b) {
            return React.createElement("li", { key: b.id },
                React.createElement("a", { href: "/book_reviews/" + b.id }, b.title));
        });
        return React.createElement("div", null,
            React.createElement("dl", null,
                React.createElement("dt", null, "\u6280\u8853\u8A55\u8AD6"),
                React.createElement("dd", null,
                    React.createElement("ul", null, tech_reviews))),
            React.createElement("dl", null,
                React.createElement("dt", null, "\u66F8\u7C4D\u8A55\u8AD6"),
                React.createElement("dd", null,
                    React.createElement("ul", null, book_reviews))));
    };
    IndexComponent.toString = function (articles) {
        return server_1.renderToString(React.createElement(IndexComponent, __assign({}, articles)));
    };
    return IndexComponent;
}(React.Component));
exports.IndexComponent = IndexComponent;
