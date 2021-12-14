import * as functions from 'firebase-functions';
const cors = require('cors')({ origin: true });

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const generateToken = functions.https.onCall((data, context) => {
	functions.logger.info(data);
	return data.code || '';
});
