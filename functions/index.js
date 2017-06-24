"use strict";
exports.__esModule = true;
var functions = require("firebase-functions");
exports.index = functions.https.onRequest(function (request, response) {
    response.send("Hello from Firebase!");
});
