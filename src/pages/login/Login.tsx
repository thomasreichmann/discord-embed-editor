import './Login.scss';
import Header from '../../components/header/Header';
import { Button } from '@mui/material';
import Footer from '../../components/footer/Footer';

function Login() {
	// TODO: fetch data from the bot like profile picture, current server count, etc, to display here

	// TODO: add invite link to 'add to discord' button
	return (
		<div>
			<Header />
			<main className="mainWrapper">
				<h1 className="boldHeader" id="welcomeHeader">
					Create custom embed messages
				</h1>
				<div className="lightDesc">Save custom message embeds and manage your them from a single dashboard!</div>
				<Button id="addDiscordBtn" variant="contained" size="large">
					Add to discord
				</Button>
			</main>

			<div className="infoBand">
				<div>
					<h1>Used by 0 servers.</h1>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default Login;
