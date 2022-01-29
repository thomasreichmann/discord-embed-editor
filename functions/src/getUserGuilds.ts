import fetch from 'node-fetch';
import Guild from './Guild';

export const getUserGuilds = async (data: RequestData, context: any) => {
	const token = data.discord_token;

	let rawResponse = await fetch('https://discord.com/api/users/@me/guilds', {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	let response: Guild[] = await rawResponse.json();

	return response;
};

interface RequestData {
	discord_token: string;
}
