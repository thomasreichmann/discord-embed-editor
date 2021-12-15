import * as functions from 'firebase-functions';
import axios from 'axios';
import fetch from 'node-fetch';
import * as url from 'url';

export const generateToken = functions.https.onCall(async (data, context) => {
	const discord = functions.config().discord;
	functions.logger.info(data);
	let code = data.code;

	try {
		const params = new url.URLSearchParams({ ...discord, code, grant_type: 'authorization_code' });
		functions.logger.info(params.toString());
		// const config = {
		// 	headers: {
		// 		'Content-Type': 'application/x-www-form-urlencoded',
		// 	},
		// };

		// let response = await axios.post('https://discord.com/api/oauth2/token', params.toString());
		let response = await fetch(`https://discord.com/api/oauth2/token`, {
			method: 'POST',
			body: params,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		});
		functions.logger.info(response);
		return `${data.code} ${functions.config().discord.client_secret}` || '';
	} catch (err) {
		functions.logger.error(err);
		throw new functions.https.HttpsError('internal', `discord responded with an error: ${err}`);
	}
});
