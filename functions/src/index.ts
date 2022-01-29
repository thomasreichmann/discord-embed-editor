import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import fetch from 'node-fetch';
import * as querystring from 'qs';
import { DiscordUser, TokenResponse } from './discord';
import { getUserGuilds } from './getUserGuilds';

// TODO: remove unused packages from package.json (like axios)
// TODO: better research the possibility of using axios instead of node-fetch

let app = admin.initializeApp({
	credential: admin.credential.cert(functions.config().service_account),
});

// TODO: when creating a user add more info to it like discord name and profile picture
// TODO: research a better solution to using two different names to define funcitons in external files
// TODO: create our bot and research how to get his user data to here
// TODO: create a function to return the overlaping guilds between the user and our bot
export const getGuilds = functions.https.onCall(getUserGuilds);

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

		let body: TokenResponse = await response.json();

		// TODO: handle error if this returns null, discord user should be nullabe
		body.discord_user = await getDiscordUser(body.access_token);
		if (body.discord_user.id) {
			body.firebase_token = await admin.auth(app).createCustomToken(body.discord_user.id);
		} else {
			body.firebase_token = '';
		}

		return `${JSON.stringify(body)}` || '';
	} catch (err) {
		functions.logger.error(err);
		throw new functions.https.HttpsError('internal', `discord responded with an error: ${err}`);
	}
});

// TODO: create a seperate file and folder for all discord related functions and declarations
async function getDiscordUser(token: string) {
	let res = await fetch('https://discord.com/api/users/@me', {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return (await res.json()) as DiscordUser;
}
