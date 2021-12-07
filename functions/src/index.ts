import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const generateToken = functions.https.onRequest((request, response) => {
	functions.logger.info(`Logging request for token generetion ${request}`, { structuredData: true });

	response.send(request.params);
});
