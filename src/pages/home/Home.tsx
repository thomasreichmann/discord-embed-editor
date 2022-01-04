import { CSSProperties } from 'react';
import { useAuth } from '../../services/auth';

function Home() {
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

	return (
		<div>
			<h1>HOME</h1>
			<p style={codeStyle}>{JSON.stringify(auth.user)}</p>
		</div>
	);
}

export default Home;
