import { store } from "./index";

export const SERVER_BASE_URL = "http://localhost:3000/";

export const authed_request = (url, options, headers={}) => {
	if (window.expires < (new Date(new Date().getTime() + (600 * 10)))) {
		// Expires in next 10 minutes so schedule renewal
		store.auth.renewToken();
	}

	if (window.expires < new Date()) {
		// Expired
		return new Promise((_,reject) => reject("Session expired. Please log in again."));
	}

	return fetch(SERVER_BASE_URL + url, {
		headers: {
			'Authorization': window.token ? 'Bearer ' + window.token : 'None',
			...headers,
		},
		...options,
	});
};

export const json_request = (method, url, data) => authed_request(url, {
	method,
	body: JSON.stringify(data),
}, {"Content-Type": "application/json"})

export const post_request = (url, data) => json_request('POST', url, data);

export const get_request = (url) => authed_request(url, {method: 'GET'});

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