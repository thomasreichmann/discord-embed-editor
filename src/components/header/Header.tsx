import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import './Header.scss';

const MainButton = styled(Button)<ButtonProps>({
	color: '#9b9d9f',
});

export default function Header() {
	return (
		<header>
			<div className="wrapper">
				<span>LOGO</span>
				<div className="buttonsWrapper">
					<div className="mainButtons">
						<MainButton>
							<a href="https://discord.gg/Hu69Ds2vse" target="_blank" rel="noreferrer">
								Support Server
							</a>
						</MainButton>
					</div>
					<Button variant="contained" href={process.env.REACT_APP_DISCORD_OAUTH_URL}>
						Login
					</Button>
				</div>
			</div>
		</header>
	);
}
