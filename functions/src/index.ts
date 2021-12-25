import * as functions from 'firebase-functions';
import fetch from 'node-fetch';
import * as querystring from 'qs';

export const generateToken = functions.https.onCall(async (data, context) => {
	const discord = functions.config().discord;
	functions.logger.info(data);
	let code = data.code;

	try {
		let rawData = {
			...discord,
			grant_type: 'authorization_code',
			code,
		};

		let qs = querystring.stringify(rawData);

		let response = await fetch('https://discordapp.com/api/oauth2/token', {
			method: 'POST',
			body: qs,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		});

		let body: any = await response.json();

		return `${JSON.stringify(body)}` || '';
	} catch (err) {
		functions.logger.error(err);
		throw new functions.https.HttpsError('internal', `discord responded with an error: ${err}`);
	}
});
