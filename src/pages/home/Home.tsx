import './Home.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/auth';
import { getGuilds, Guild } from '../../services/firebase/firebase';

function Home() {
	let navigate = useNavigate();
	let [guilds, setGuilds] = useState<Guild[] | undefined>(undefined);
	useEffect(() => {
		(async () => {
			let token = localStorage.getItem('discord_token') || '';
			let res = await getGuilds(token);
			console.log(res);
			setGuilds(res);
		})();
	}, []);

	let auth = useAuth();

	let logout = () => {
		auth.signout().then(() => {
			navigate('login');
		});
	};

	return (
		<div>
			<h1>HOME</h1>
			<button onClick={logout}>logout</button>
			<ul>
				<h2>List of Guilds</h2>
				{guilds?.map(guild => {
					return <li>{guild.name}</li>;
				})}
			</ul>
			{/* <p style={codeStyle}>{JSON.stringify(guilds)}</p> */}
			{/* <p style={codeStyle}>{JSON.stringify(auth.user)}</p> */}
		</div>
	);
}

export default Home;
