export enum Path {
	Home = '/home',
	Lobby = "/lobby",
	Dealer = '/dealer',
	Root = '/',
	Origin = ''
}

export const setUrl = (path: Path = Path.Origin) => window.history.replaceState(window.history.state, '', window.location.origin + path);


