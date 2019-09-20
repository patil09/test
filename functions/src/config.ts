import * as functions from 'firebase-functions';

import admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);


export default admin;