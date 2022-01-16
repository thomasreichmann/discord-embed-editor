import './Footer.scss';

export default function Footer() {
	return (
		<main className="footer">
			<div id="contentWrapper">
				<div>
					<p className="title">Info</p>
					<p>
						Created with 💘, 🍺 and <span id="reactEmoji">⚛︎</span>
					</p>
					<p>- thomas</p>
				</div>
				<div>
					<p className="title">Links</p>
					<p>
						<a href="https://discord.gg/Hu69Ds2vse" target="_blank" rel="noreferrer">
							Discord
						</a>
					</p>
					<p>
						<a href="https://github.com/thomasreichmann/discord-embed-editor-web" target="_blank" rel="noreferrer">
							Github
						</a>
					</p>
					<p>
						<a href="https://thomasar.dev/" target="_blank" rel="noreferrer">
							me
						</a>
					</p>
				</div>
			</div>
		</main>
	);
}
