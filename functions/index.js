"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var functions = require("firebase-functions");
var http = require("https");
var index_1 = require("./render/index");
var fs = require("fs");
var jsdom = require("jsdom");
var url = require("url");
var markdown = require("markdown");
exports.index = functions.https.onRequest(function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = (_a = response).send;
                return [4 /*yield*/, index()];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); });
exports.tech_reviews = functions.https.onRequest(function (request, response) { return __awaiter(_this, void 0, void 0, function () {
    var id, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                id = url.parse(request.url).pathname.split("/")[2];
                _b = (_a = response).send;
                return [4 /*yield*/, tech_review(id)];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); });
function tech_review(id) {
    return __awaiter(this, void 0, void 0, function () {
        var article, html_string, dom, react_app;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getHTTP("https://isyumi-blog2.firebaseio.com/tech_reviews/" + id + ".json")];
                case 1:
                    article = _a.sent();
                    article.body = markdown.markdown.toHTML(article.body);
                    return [4 /*yield*/, getFile("index.html")];
                case 2:
                    html_string = _a.sent();
                    dom = new jsdom.JSDOM(html_string);
                    dom.window.document.title = "弩ブログ " + article.title;
                    react_app = dom.window.document.getElementById("react-app");
                    react_app.innerHTML = index_1.TechReviewComponent.toString(article);
                    return [2 /*return*/, dom.serialize()];
            }
        });
    });
}
function index() {
    return __awaiter(this, void 0, void 0, function () {
        var json, articles, book_reviews, b, tech_reviews, b, html_string, dom, react_app;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getHTTP("https://isyumi-blog2.firebaseio.com/.json")];
                case 1:
                    json = _a.sent();
                    articles = {
                        book_reviews: [],
                        tech_reviews: []
                    };
                    book_reviews = json["book_reviews"];
                    for (b in book_reviews) {
                        articles.book_reviews.push({
                            id: b,
                            datetime: book_reviews[b]["datetime"],
                            title: book_reviews[b]["title"],
                            body: book_reviews[b]["body"]
                        });
                    }
                    tech_reviews = json["tech_reviews"];
                    for (b in tech_reviews) {
                        articles.tech_reviews.push({
                            id: b,
                            datetime: tech_reviews[b]["datetime"],
                            title: tech_reviews[b]["title"],
                            body: tech_reviews[b]["body"]
                        });
                    }
                    return [4 /*yield*/, getFile("index.html")];
                case 2:
                    html_string = _a.sent();
                    dom = new jsdom.JSDOM(html_string);
                    dom.window.document.title = "弩ブログ";
                    react_app = dom.window.document.getElementById("react-app");
                    react_app.innerHTML = index_1.IndexComponent.toString(articles);
                    return [2 /*return*/, dom.serialize()];
            }
        });
    });
}
function getFile(path) {
    return new Promise(function (resolve, error) {
        fs.readFile(path, "utf8", function (err, data) {
            resolve(data);
        });
    });
}
function getHTTP(path) {
    return new Promise(function (resolve, error) {
        http.get(path, function (res) {
            res.setEncoding('utf8');
            var body = "";
            res.on("data", function (d) {
                body += d;
            });
            res.on('end', function () {
                resolve(JSON.parse(body));
            });
        });
    });
}
tech_review("HkK3f7RZ9bZ51OlV").then(function (d) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log(d);
        process.exit();
        return [2 /*return*/];
    });
}); })["catch"](function (e) {
    console.log(e);
});
