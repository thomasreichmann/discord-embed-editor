import * as functions from 'firebase-functions';
const cors = require('cors')({ origin: true });

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const generateToken = functions.https.onRequest((request, response) => {
	cors(request, response, () => {
		functions.logger.info(`Logging request for token generetion ${request}`, { structuredData: true });

		return response.status(200).send({ ...request.params });
	});
});
