import { observable, computed, action } from "mobx";

import PostModel, { generatePost } from "./PostModel";

// A user that we're logged in as
// This doesn't contain karma/user content
export class AuthedUser {
	username = ""
	email = ""

	// Not needed yet
	// token = ""

	constructor(username, email="") {
		this.username = username
		this.email = email
	}
}

export default class AuthenticationModel {
	@observable
	loggedInUser = null;

	// Used for login page
	@observable
	loginInProgress = false;

	@observable
	authenticationError = "";

	@computed get isLoggedIn() {
		return this.loggedInUser !== null;
	}

	@action
	attemptLogin(username, password) {
		// TODO: Proper authentication logic
		// For now just a static delay to show things

		this.loginInProgress = true;

		// Wrapping in action ensures things are recalculated afterwards
		setTimeout(action(() => {
			if (username == "admin" && password == "admin") {
				this.loggedInUser = new AuthedUser(username, "asdf@asdf.com");
			} else {
				this.authenticationError = "Invalid username/password";
			}

			this.loginInProgress = false;
		}), 3000);
	}
}
