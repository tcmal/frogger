//! Stores authentication state

import { observable, computed, action } from "mobx";

import { post_request } from "../util";

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
				const user = {
					name: prevAuth.username,
					email: prevAuth.email
				};
				const token = prevAuth.token;

				this.loggedInUser = new AuthedUser(token, user);
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
		// TODO: Proper authentication logic
		// For now just a static delay to show things

		this.requestInProgress = true;
		this.error = "";
	
		post_request("/users/auth", {
			username, password
		}).then(x => x.json())
		.then(action(resp => {
			console.log(resp);
			this.requestInProgress = false;
			if (resp.error) {
				this.error = resp.error.message;
			} else {
				this.loggedInUser = new AuthedUser(resp.token, resp.user);
				localStorage.setItem('authedUser', JSON.stringify(this.loggedInUser));
			}
		}))
	}

	@action
	attemptRegister(username, password, email) {
		// TODO: Proper register logic

		this.requestInProgress = true;
		this.error = "";

		// Wrapping in action ensures things are recalculated afterwards
		setTimeout(action(() => {
			if (username == "admin") {
				this.error = "Username is taken";
			} else {
				this.loggedInUser = new AuthedUser(username, email);
			}

			this.requestInProgress = false;
		}), 3000);
	}

	@action doLogout() {
		this.loggedInUser = null;
	}

	@action unsubscribeFrom = (name) => {
		this.loggedInUser.subscriptions.items = this.loggedInUser.subscriptions.items.filter(x => x.name != name);
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

	constructor(token, { name, email="" }) {
		this.username = name
		this.email = email
		this.token = token;

		window.token = token;

		this.subscriptions = new SubscriptionListModel();
	}
}
