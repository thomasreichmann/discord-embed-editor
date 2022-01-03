import { getCurrentUser, useAuth } from '../../services/auth';

function Home() {
	let auth = useAuth();

	return (
		<div>
			<h1>HOME</h1>
			<p>{JSON.stringify(auth.user)}</p>
		</div>
	);
}

export default Home;
