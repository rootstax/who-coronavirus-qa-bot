"use strict";

// Use dotenv to read .env vars into Node
require("dotenv").config();

module.exports = {

    googleProjectId: process.env.GOOGLE_PROJECT_ID,
    dialogflowSessionId: process.env.DIALOGFLOW_SESSION_ID,
    dialogflowSessionLanguageCode: process.env.DIALOGFLOW_SESSION_LANGUAGE_CODE,
    googleClientEmail: process.env.GOOGLE_CLIENT_EMAIL,
    googlePrivateKey: process.env.GOOGLE_PRIVATE_KEY
};