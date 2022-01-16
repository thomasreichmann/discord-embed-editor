import './Redirect.scss';
import { useSearchParams, useNavigate } from 'react-router-dom';
import * as firebase from '../../services/firebase/firebase';
import { CSSProperties, useEffect, useState } from 'react';
import { useAuth } from '../../services/auth';

function Redirect() {
	let [searchParams] = useSearchParams();
	let [token, setToken] = useState('');
	let navigate = useNavigate();
	let auth = useAuth();

	// TODO: research the possibility of using a modal instead of a redirect for this
	// similar to how mee6 does it

	// TODO: clean up this page and make it just a loading intermidiate between the oauth and redirect to home
	// maybe get some cool spinners and info text on what is loading at the moment

	let codeStyle: CSSProperties = {
		background: '#222222',
		padding: '7px',
		fontSize: '36px',
		color: 'grey',
		fontWeight: 400,
		borderRadius: '15px',
		display: 'flex',
		overflowWrap: 'anywhere',
		width: '1100px',
	};

	let code = searchParams.get('code');

	useEffect(() => {
		// Async function
		(async () => {
			if (code) {
				let data = await firebase.requestToken(code);
				console.log(data);
				setToken(data.firebase_token);

				localStorage.setItem('firebase_token', data.firebase_token);
				localStorage.setItem('discord_token', data.access_token);
				localStorage.setItem('refresh_token', data.refresh_token);

				let d = new Date();
				let expire_at = new Date(d.getTime() + data.expires_in * 1000).getTime().toString();
				localStorage.setItem('expire_at', expire_at);

				auth.signin(data.firebase_token).then(() => {
					console.log('signed in');
					navigate('/', { replace: true });
				});
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<h1>REDIRECT</h1>
			<h2>
				CODE FROM URL: <span style={codeStyle}>{code}</span>
			</h2>
			<h2>
				RESPONSE: <span style={codeStyle}>{token || 'Nao recebido ainda'}</span>
			</h2>
		</div>
	);
}

export default Redirect;
