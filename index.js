
// TODO: 
// 1. replace the data.json with your actual data to import
// 2. get your serviceAccountKey.json from Firebase (Project settings -> service accounts -> generate new private key)
// 3. REPLACE THE COLLECTION_KEY with a key, e.g. cities, users, ...
// 4. replace the "YOUR_DATABASE_URL" with the affected firestore db url

const admin = require('./node_modules/firebase-admin');
const serviceAccount = require("./serviceAccountKey.json");
const data = require("./data.json");

const collectionKey = "COLLECTION_KEY";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "YOUR_DATABASE_URL"
});

const firestore = admin.firestore();
const settings = { timestampsInSnapshots: true };

firestore.settings(settings);


if (data && (typeof data === "object")) {
  Object.keys(data).forEach(docKey => {
    firestore.collection(collectionKey).doc(docKey).set(data[docKey]).then((res) => {
      console.log("Document " + docKey + " successfully written!");
    }).catch((error) => {
      console.error("Error writing document: ", error);
    });
  });
}