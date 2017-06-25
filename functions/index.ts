import functions = require( "firebase-functions");
import http = require('https');
import {Articles, IndexComponent} from "./render/index";
import fs = require("fs");
import jsdom = require("jsdom");

declare namespace jsdom {
    class JSDOM {
        constructor(html: string);

        window: any;

        serialize();
    }
}

exports.index = functions.https.onRequest(async (request, response) => {
    response.send(await index());
});

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

// ssr().then(async (d) => {
//     console.log(d);
//     process.exit();
// }).catch(e => {
//     console.log(e)
// });

