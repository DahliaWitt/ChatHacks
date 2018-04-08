"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});
exports.deleteOld = functions.https.onRequest((req, res) => {
    const date = new Date();
    const dateString = date.toLocaleDateString();
    console.log(dateString);
    admin.database().ref('chatrooms/').orderByChild('expire').equalTo(dateString).once('value')
        .then((snapshot) => {
        let count = 0;
        snapshot.forEach((snap) => {
            snap.ref.remove();
            admin.database().ref('geo/' + snap.key).remove();
            count++;
        });
        res.send("Count removed: " + count);
    });
});
//# sourceMappingURL=index.js.map