export interface TokenResponse {
	access_token: string;
	expires_in: number;
	refresh_token: string;
	scope: string;
	token_type: string;
	firebase_token: string;
	discord_user: DiscordUser;
}

export interface DiscordUser {
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
