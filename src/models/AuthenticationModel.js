//! Stores authentication state

import { observable, computed, action } from "mobx";

import LoadableMixin from "./LoadableMixin";
import SubscriptionListModel from "./SubscriptionListModel";

export default class AuthenticationModel extends LoadableMixin {
	@observable
	loggedInUser = null;

	@computed get isLoggedIn() {
		return this.loggedInUser !== null;
	}

	@action
	attemptLogin(username, password) {
		// TODO: Proper authentication logic
		// For now just a static delay to show things

		this.requestInProgress = true;
		this.error = "";

		// Wrapping in action ensures things are recalculated afterwards
		setTimeout(action(() => {
			if (username == "admin" && password == "admin") {
				this.loggedInUser = new AuthedUser(username, "asdf@asdf.com");
			} else {
				this.error = "Invalid username/password";
			}

			this.requestInProgress = false;
		}), 3000);
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

	// Not needed yet
	// token = ""

	constructor(username, email="") {
		this.username = username
		this.email = email
		this.subscriptions = new SubscriptionListModel();
	}
}
