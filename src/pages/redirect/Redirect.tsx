import { useSearchParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import * as firebase from '../../services/firebase/firebase';
import { CSSProperties, useEffect, useState } from 'react';

function Redirect() {
	let [searchParams, setSearchParams] = useSearchParams();
	let [token, setToken] = useState('');

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
				let res = await firebase.requestToken(code);
				setToken(res.data as string);
			}
		})();
	}, []);

	let auth = getAuth();
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
