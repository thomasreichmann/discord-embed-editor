import * as functions from 'firebase-functions';
import axios from 'axios';
import * as url from 'url';
import * as FormData from 'form-data';
import fetch from 'node-fetch';

export const generateToken = functions.https.onCall(async (data, context) => {
	const discord = functions.config().discord;
	functions.logger.info(data);
	let code = data.code;

	try {
		// const params = new url.URLSearchParams({ ...discord, code, grant_type: 'authorization_code' });

		const form = new FormData();
		form.append('client_id', discord.client_id);
		form.append('client_secret', discord.client_secret);
		form.append('redirect_uri', discord.redirect_uri);
		form.append('code', code);
		form.append('grant_type', 'authorization_code');

		let response = await fetch('https://discordapp.com/api/oauth2/token', {
			method: 'POST',
			body: data,
		});

		// axios.post('https://example.com', form, { headers: form.getHeaders() });

		// let data = `client_id=${discord.client_id}&client_secret=${discord.client_secret}&redirect_uri=${discord.redirect_uri}&code=${code}&grant_type=authorization_code`;

		// let data = { ...discord, code, grant_type: 'authorization_code' };

		// const config = {
		// 	headers: {
		// 		'Content-Type': 'application/x-www-form-urlencoded',
		// 	},
		// };

		// let response = await axios.post('https://discord.com/api/oauth2/token', JSON.stringify(data), config);

		return `${functions.config().discord.client_secret}` || '';
	} catch (err) {
		functions.logger.error(err);
		throw new functions.https.HttpsError('internal', `discord responded with an error: ${err}`);
	}
});
