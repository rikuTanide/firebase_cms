import functions = require( "firebase-functions");
import fs = require("fs");

exports.index = functions.https.onRequest(async (request, response) => {
    let index = await getFile("index.html");
    response.send(index);
});

// async function main(): Promise<any> {
//     let index = await getFile("index.html");
//     console.log(index);
// }

function getFile(path: string): Promise<string> {
    return new Promise((resolve, error) => {
        fs.readFile(path, "utf8", (err, data) => {
            resolve(data);
        });
    });
}

// main().then(() => {
//     process.exit();
// });