import { Button } from '@mui/material';

function Login() {
	// TODO: re desing login page to look more like a landing page, maybe take inspiration from mee6 and such
	return (
		<header>
			<h1>LOGIN</h1>
			<Button href={process.env.REACT_APP_DISCORD_OAUTH_URL}>discord oauth</Button>
		</header>
	);
}

export default Login;
