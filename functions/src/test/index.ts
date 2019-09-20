import * as functions from "firebase-functions";
import { filterTest, filter, auth, logs } from "./testfun";

const express = require("express");
const testApp = express();

// [START middleware]
const cors = require("cors")({ origin: true });
testApp.use(cors);
// [END middleware]
testApp.use(logs)
testApp.post("/filterTest", auth, filter, filterTest);

export default functions.https.onRequest(testApp);
