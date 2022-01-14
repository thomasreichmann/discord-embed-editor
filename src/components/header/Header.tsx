import { Button } from '@mui/material';
import './Header.scss';

export default function Header() {
	return (
		<header>
			<div className="wrapper">
				<span>LOGO</span>
				<div className="buttonsWrapper">
					<div className="mainButtons">
						<Button>test</Button>
						<Button>test</Button>
						<Button>test</Button>
					</div>
					<Button variant="contained" href={process.env.REACT_APP_DISCORD_OAUTH_URL}>
						Login
					</Button>
				</div>
			</div>
		</header>
	);
}
