import { Button } from '@mui/material';

function Login() {
	return (
		<header>
			<h1>LOGIN</h1>
			<Button href={process.env.REACT_APP_DISCORD_OAUTH_URL}>discord oauth</Button>
		</header>
	);
}

export default Login;
