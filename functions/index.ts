import functions = require( "firebase-functions");
import fs = require("fs");
import jsdom = require("jsdom");
import {IndexComponent} from "./render/index";

declare namespace jsdom {
    class JSDOM {
        constructor(html: string);

        window: any;

        serialize();
    }
}

exports.index = functions.https.onRequest(async (request, response) => {
    response.send(await ssr());
});

async function ssr(): Promise<any> {
    let html_string = await getFile("index.html");
    let dom = new jsdom.JSDOM(html_string);
    let react_app = dom.window.document.getElementById("react-app");
    react_app.innerHTML = IndexComponent.toString();
    return dom.serialize();
}

function getFile(path: string): Promise<string> {
    return new Promise((resolve, error) => {
        fs.readFile(path, "utf8", (err, data) => {
            resolve(data);
        });
    });
}

// ssr().then((d) => {
//     console.log(d);
//     process.exit();
// });