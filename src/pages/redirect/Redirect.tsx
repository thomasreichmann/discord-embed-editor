import { useSearchParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

function Redirect() {
	let [searchParams, setSearchParams] = useSearchParams();

	let code = searchParams.get('code');

	let auth = getAuth();
	return (
		<div>
			<h1>REDIRECT</h1>
			<h2>CODE: {code}</h2>
		</div>
	);
}

export default Redirect;
