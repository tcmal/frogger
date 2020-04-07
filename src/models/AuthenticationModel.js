//! Stores authentication state

import { observable, computed, action } from "mobx";

import { post_request, json_request } from "../util";

import LoadableMixin from "./LoadableMixin";
import SubscriptionListModel from "./SubscriptionListModel";

export default class AuthenticationModel extends LoadableMixin {
	@observable
	loggedInUser = null;

	constructor() {
		super();
		if (localStorage.getItem('authedUser')) {
			try {
				const prevAuth = JSON.parse(localStorage.getItem('authedUser'));

				if (new Date(prevAuth.expires) < new Date()) {
					throw new Error("Expired token");
				}

				const user = {
					name: prevAuth.username,
					email: prevAuth.email
				};

				this.loggedInUser = new AuthedUser(prevAuth.token, new Date(prevAuth.expires), user);
			} catch (_) {
				localStorage.removeItem('authedUser');
			}
		}
	}

	@computed get isLoggedIn() {
		return this.loggedInUser !== null;
	}

	@action
	attemptLogin(username, password) {
		this.requestInProgress = true;
		this.error = "";
	
		post_request("/users/auth", {
			username, password
		}).then(x => x.json())
		.then(action(resp => {
			this.requestInProgress = false;
			if (resp.error) {
				this.error = resp.error.message;
			} else {
				this.loggedInUser = new AuthedUser(resp.token, new Date(resp.expires), resp.user);
				localStorage.setItem('authedUser', JSON.stringify(this.loggedInUser));
			}
		}))
	}

	@action
	attemptRegister(username, password, email) {
		this.requestInProgress = true;
		this.error = "";

		post_request("/users", {
			name: username,
			password, email
		}).then(x => x.json())
		.then(action(resp => {
			this.requestInProgress = false;
			if (resp.error) {
				this.error = resp.error.message;
			} else {
				this.attemptLogin(username, password);
			}
		}));
	}

	@action doLogout() {
		this.loggedInUser = null;
		localStorage.removeItem('authedUser');
	}

	@action unsubscribeFrom = (sub) => {
		this.loggedInUser.subscriptions.items = this.loggedInUser.subscriptions.items.filter(x => x.name != sub.name);

		this.requestInProgress = true;
		this.error = "";
		json_request("DELETE", "/sub/" + sub.name + "/unsubscribe")
			.then(x => x.json())
			.then(action(resp => {
				// TODO: Find somewhere to display this error, probably a toast
				this.requestInProgress = false;
				if (resp.error) {
					this.error = resp.error.message;
				}
			}));
	}

	@action subscribeTo = (sub) => {
		this.loggedInUser.subscriptions.items.push(sub);

		this.requestInProgress = true;
		this.error = "";
		json_request("POST", "/sub/" + sub.name + "/subscribe")
			.then(x => x.json())
			.then(action(resp => {
				// TODO: Find somewhere to display this error, probably a toast
				this.requestInProgress = false;
				if (resp.error) {
					this.error = resp.error.message;
				}
			}));
	}

	@action renewToken() {
		this.requestInProgress = true;
		this.error = "";

		get_request("/user/renewToken")
			.then(x => x.json())
			.then(action(resp => {
				this.requestInProgress = false;
				if (resp.error) {
					this.error = resp.error.message;
				} else {
					this.authedUser.token = resp.token;
					this.authedUser.expires = new Date(resp.expires);

					window.token = resp.token;
					window.expires = new Date(resp.expires);
				}
			}));
	}
}

// A user that we're logged in as
// This doesn't contain karma/user content
export class AuthedUser {
	username = ""
	email = ""

	@observable
	subscriptions = null

	token = ""
	expires = ""

	constructor(token, expires, { name, email="" }) {
		this.username = name
		this.email = email
		this.token = token;

		window.token = token;
		window.expires = expires;

		this.subscriptions = new SubscriptionListModel();
	}
}
