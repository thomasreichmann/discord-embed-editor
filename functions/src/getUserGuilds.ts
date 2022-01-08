import fetch from 'node-fetch';

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

// TODO: create seperate declaration file for this type
interface Guild {
	id: string;
	name: string;
	icon: string;
	owner: boolean;
	permissions: string;
	features: string[];
}

interface RequestData {
	discord_token: string;
}
