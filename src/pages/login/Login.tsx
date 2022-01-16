import './Login.scss';
import Header from '../../components/header/Header';
import { Button } from '@mui/material';
import Footer from '../../components/footer/Footer';

function Login() {
	// TODO: re desing login page to look more like a landing page, maybe take inspiration from mee6 and such
	return (
		<div>
			<Header />
			<main className="mainWrapper">
				<h1 className="boldHeader" id="welcomeHeader">
					Create custom embed messages
				</h1>
				<div className="lightDesc">
					Configure moderação, níveis, alertas da Twitch, e muito mais com nossa central de controles super
					simplificada!
				</div>
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
