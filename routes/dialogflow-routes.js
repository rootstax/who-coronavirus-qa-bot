//const dialogflow = require('dialogflow');
const dialogflow = require('dialogflow').v2beta1;
const config = require("../services/config");

// Use dotenv to read .env vars into Node
require("dotenv").config();


module.exports = app => {
    app.get('/', (req, res) => {
        res.send({
            'hello': 'Miko'
        });
    });

    app.post('/api/df_text_query', async (req, res) => {


        const credentials = {
            client_email: process.env.GOOGLE_CLIENT_EMAIL, //config.googleClientEmail,
            private_key: process.env.GOOGLE_PRIVATE_KEY //config.googlePrivateKey
        }

        // Instantiate a DialogFlow client.
        const projectId = process.env.GOOGLE_PROJECT_ID; //config.googleProjectId;

        const sessionClient = new dialogflow.SessionsClient({
            projectId,
            credentials
        });
        const sessionId = process.env.DIALOGFLOW_SESSION_ID; //config.dialogflowSessionId;
        const languageCode = process.env.DIALOGFLOW_SESSION_LANGUAGE_CODE; //config.dialogflowSessionLanguageCode;
        const knowledgeBaseFullName = "MTQ2OTUzMDkzNTU3ODQzMzk0NTY";
        //"projects/covid-19-faq-qpfqbi/knowledgeBases/MTQ2OTUzMDkzNTU3ODQzMzk0NTY";

        // Create a new session
        //const sessionPath = sessionClient.sessionPath(config.googleProjectId, config.dialogflowSessionId);

        // Define session path
        const sessionPath = sessionClient.sessionPath(projectId, sessionId);
        const knowbase = new dialogflow.KnowledgeBasesClient();
        const knowledgeBasePath = knowbase.knowledgeBasePath(
            projectId,
            knowledgeBaseFullName
        );

        // The audio query request
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: req.body.text,
                    languageCode: languageCode,
                },
            },
            queryParams: {
                knowledgeBaseNames: [knowledgeBasePath],
            },
        };

        const responses = await sessionClient.detectIntent(request);
        const result = responses[0].queryResult;
        console.log(`Query text: ${result.queryText}`);
        console.log(`Detected Intent: ${result.intent.displayName}`);
        console.log(`Confidence: ${result.intentDetectionConfidence}`);
        console.log(`Query Result: ${result.fulfillmentText}`);
        /*         if (result.knowledgeAnswers && result.knowledgeAnswers.answers) {
                    const answers = result.knowledgeAnswers.answers;
                    console.log(`There are ${answers.length} answer(s);`);
                    answers.forEach(a => {
                        console.log(`   answer: ${a.answer}`);
                        console.log(`   confidence: ${a.matchConfidence}`);
                        console.log(`   match confidence level: ${a.matchConfidenceLevel}`);
                    });
                }  */
        // [END dialogflow_detect_intent_knowledge]

        res.send(result.fulfillmentText);

        /*
        res.send({
            'do': 'text query'
        }); */
    });

    app.post('/api/df_event_query', (req, res) => {
        res.send({
            'do': 'event query'
        });
    });
}