import { Button } from '@mui/material';

function Home() {
	return (
		<div>
			<Button href={process.env.REACT_APP_DISCORD_OAUTH_URL}>discord oauth</Button>
		</div>
	);
}

export default Home;
