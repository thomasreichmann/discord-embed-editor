import './App.css';
import { Button } from '@mui/material';

function App() {
	return (
		<div className="App">
			<Button href={process.env.REACT_APP_DISCORD_OAUTH_URL}>Login with Discord</Button>
		</div>
	);
}

export default App;
