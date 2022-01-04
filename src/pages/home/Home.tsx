import { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/auth';

function Home() {
	let navigate = useNavigate();

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

	let auth = useAuth();

	let logout = () => {
		auth.signout().then(() => {
			navigate('login');
		});
	};

	// TODO: Attempt to get specific user info from front-end with the new auth system
	// TODO: Attempt to get specific discord info to front-end
	return (
		<div>
			<h1>HOME</h1>
			<button onClick={logout}>logout</button>
			<p style={codeStyle}>{JSON.stringify(auth.user)}</p>
		</div>
	);
}

export default Home;
