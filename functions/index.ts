import functions = require( "firebase-functions");
import http = require('https');
import {
    Articles,
    BookReviewComponent,
    BookReviews,
    IndexComponent,
    TechReview,
    TechReviewComponent
} from "./render/index";
import fs = require("fs");
import jsdom = require("jsdom");
import url = require('url');
import markdown = require("markdown");


declare namespace jsdom {
    class JSDOM {
        constructor(html: string);

        window: any;

        serialize();
    }
}

declare namespace markdown {
    class markdown {
        static toHTML(str: string): string;
    }
}

exports.index = functions.https.onRequest(async (request, response) => {
    response.send(await index());
});

exports.tech_reviews = functions.https.onRequest(async (request, response) => {
    let id = url.parse(request.url).pathname.split("/")[2];
    response.send(await tech_review(id));
});

exports.book_reviews = functions.https.onRequest(async (request, response) => {
    let id = url.parse(request.url).pathname.split("/")[2];
    response.send(await book_review(id));
});

async function tech_review(id): Promise<any> {
    let article = await getHTTP("https://isyumi-blog2.firebaseio.com/tech_reviews/" + id + ".json") as TechReview;
    article.body = markdown.markdown.toHTML(article.body);
    let html_string = await getFile("index.html");
    let dom = new jsdom.JSDOM(html_string);
    dom.window.document.title = "弩ブログ " + article.title;
    dom.window.document.getElementsByTagName("link")[0].setAttribute("href", "/tech_reviews/" + id);
    let react_app = dom.window.document.getElementById("react-app");
    react_app.innerHTML = TechReviewComponent.toString(article);
    return dom.serialize();
}

async function book_review(id): Promise<any> {
    let article = await getHTTP("https://isyumi-blog2.firebaseio.com/book_reviews/" + id + ".json") as BookReviews;
    article.body = markdown.markdown.toHTML(article.body);
    let html_string = await getFile("index.html");
    let dom = new jsdom.JSDOM(html_string);
    dom.window.document.title = "弩ブログ " + article.title;
    dom.window.document.getElementsByTagName("link")[0].setAttribute("href", "/book_reviews/" + id);
    let react_app = dom.window.document.getElementById("react-app");
    react_app.innerHTML = BookReviewComponent.toString(article);
    return dom.serialize();
}

async function index(): Promise<any> {

    let json = await getHTTP("https://isyumi-blog2.firebaseio.com/.json");
    let articles = <Articles>{
        book_reviews: [],
        tech_reviews: [],
    };

    let book_reviews = json["book_reviews"];
    for (let b in book_reviews) {
        articles.book_reviews.push({
            id: b,
            datetime: book_reviews[b]["datetime"],
            title: book_reviews[b]["title"],
            body: book_reviews[b]["body"],
        })
    }

    let tech_reviews = json["tech_reviews"];
    for (let b in tech_reviews) {
        articles.tech_reviews.push({
            id: b,
            datetime: tech_reviews[b]["datetime"],
            title: tech_reviews[b]["title"],
            body: tech_reviews[b]["body"],
        })
    }

    let html_string = await getFile("index.html");
    let dom = new jsdom.JSDOM(html_string);
    dom.window.document.title = "弩ブログ";
    let react_app = dom.window.document.getElementById("react-app");
    react_app.innerHTML = IndexComponent.toString(articles);
    return dom.serialize();

}

function getFile(path: string): Promise<string> {
    return new Promise((resolve, error) => {
        fs.readFile(path, "utf8", (err, data) => {
            resolve(data);
        });
    });
}

function getHTTP(path: string): Promise<string> {
    return new Promise((resolve, error) => {
        http.get(path, (res) => {
            res.setEncoding('utf8');
            let body = "";

            res.on("data", (d) => {
                body += d;
            });

            res.on('end', () => {
                resolve(JSON.parse(body));
            });
        });
    });
}

// tech_review("HkK3f7RZ9bZ51OlV").then(async (d) => {
//     console.log(d);
//     process.exit();
// }).catch(e => {
//     console.log(e)
// });

