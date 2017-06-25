import functions = require( "firebase-functions");
import * as admin from "firebase-admin";
// import http = require('http');

import fs = require("fs");
import jsdom = require("jsdom");
import {IndexComponent} from "./render/index";

let serviceAccount = require("./private/isyumi-blog2-firebase-adminsdk-3wyka-395e1d3821.json");

declare namespace jsdom {
    class JSDOM {
        constructor(html: string);

        window: any;

        serialize();
    }
}

exports.index = functions.https.onRequest(async (request, response) => {

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://isyumi-blog2.firebaseio.com/",
    });

    let db = admin.database();
    let val = (await db.ref("/").once("value")).val();

    response.send(val);
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