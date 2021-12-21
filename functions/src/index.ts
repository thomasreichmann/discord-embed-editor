import * as functions from 'firebase-functions';
import axios from 'axios';
import * as url from 'url';
import * as FormData from 'form-data';
import fetch from 'node-fetch';
import * as querystring from 'qs';

export const generateToken = functions.https.onCall(async (data, context) => {
	const discord = functions.config().discord;
	functions.logger.info(data);
	let code = data.code;

	try {
		//TODO: attempt to use qs to create formdata
		const form = new FormData();
		form.append('client_id', discord.client_id);
		form.append('client_secret', discord.client_secret);
		form.append('redirect_uri', discord.redirect_uri);
		form.append('code', code);
		form.append('grant_type', 'authorization_code');
		// let form = JSON.stringify({
		// 	...discord,
		// 	grant_type: 'authorization_code',
		// 	code,
		// });
		// let info = {
		// 	...discord,
		// 	grant_type: 'authorization_code',
		// 	code,
		// };

		// let params = new URLSearchParams(info);

		let response = await fetch('https://discordapp.com/api/oauth2/token', {
			method: 'POST',
			body: form,
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		let body: any = await response.json();

		return `${JSON.stringify(body)}` || '';
	} catch (err) {
		functions.logger.error(err);
		throw new functions.https.HttpsError('internal', `discord responded with an error: ${err}`);
	}
});
