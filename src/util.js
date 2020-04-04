export const friendlyTimeSince = (past) => {
	const now = new Date();

	const delta = Math.round((now - past) / 1000);

	if (delta < 30) {
		return 'just now';
	} else if (delta < 60) {
		return delta + ' seconds ago';
	} else if (delta < 120) {
		return 'a minute ago';
	} else if (delta < 60 * 60) {
		return Math.floor(delta / 60) + ' minutes ago';
	} else if (delta < 60 * 60 * 24) {
		return Math.floor(delta / 60 / 60) + ' hours ago';
	} else if (delta < 60 * 60 * 24 * 30) { 
		return Math.floor(delta / 60 / 60 / 24) + ' days ago';
	} else if (delta < 60 * 60 * 24 * 30 * 12) {
		return Math.floor(delta / 60 / 60 / 24 / 30) + ' months ago';
	} else {
		return Math.floor(delta / 60 / 60 / 24 / 30 / 12) + ' years ago';
	}
};