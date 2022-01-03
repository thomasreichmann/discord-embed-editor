import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import fetch from 'node-fetch';
import * as querystring from 'qs';

let app = admin.initializeApp({
	credential: admin.credential.cert(functions.config().service_account),
});

export const generateToken = functions.https.onCall(async (data, context) => {
	const discord = functions.config().discord;
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

		let discordUser = await getDiscordUser(body.access_token);
		console.log(discordUser);
		let firebaseToken = await admin.auth(app).createCustomToken('123123123123');

		// console.log(firebaseToken);

		body.discordUser = discordUser;
		body.firebaseToken = firebaseToken;

		return `${JSON.stringify(body)}` || '';
	} catch (err) {
		functions.logger.error(err);
		throw new functions.https.HttpsError('internal', `discord responded with an error: ${err}`);
	}
});

async function getDiscordUser(token: string) {
	console.log('rodando discord user');
	console.log(token);
	// TODO: this is returning a 401, we need to fix this and find a way to authneticate properly,
	// the token is correct here and it works in postman
	let res = await fetch('https://discord.com/api/users/@me', {
		headers: {
			Authentication: `Bearer ${token}`,
		},
	});

	return (await res.json()) as DiscordUser;
}

interface DiscordUser {
	id: string;
	username: string;
	avatar: string;
	discriminator: string;
	public_flags: number;
	flags: number;
	banner: null;
	banner_color: null;
	accent_color: null;
	locale: string;
	mfa_enabled: boolean;
	premium_type: number;
}
