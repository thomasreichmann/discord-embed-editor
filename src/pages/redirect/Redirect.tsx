import { useSearchParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import * as firebase from '../../services/firebase/firebase';
import { useEffect, useState } from 'react';

function Redirect() {
	let [searchParams, setSearchParams] = useSearchParams();
	let [token, setToken] = useState('');

	let code = searchParams.get('code');

	useEffect(() => {
		// Async function
		(async () => {
			if (code) {
				// TODO: Solve network error for current request
				let res = await firebase.requestToken(code);
				console.log(res);
				setToken(res.data as string);
			}
		})();
	});

	let auth = getAuth();
	return (
		<div>
			<h1>REDIRECT</h1>
			<h2>
				CODE:{' '}
				<span
					style={{
						background: '#222222',
						padding: '7px',
						fontSize: '36px',
						color: 'grey',
						fontWeight: 400,
						borderRadius: '15px',
					}}
				>
					{code}
				</span>
			</h2>
			<h2>RESPONSE: {token || 'Nao recebido ainda'}</h2>
		</div>
	);
}

export default Redirect;
