//! Stores authentication state

import { observable, computed, action } from "mobx";

import LoadableMixin from "./LoadableMixin";

export default class PosterModel extends LoadableMixin {

	@action makePost = (sub, title, is_link, content) => new Promise((resolve, reject) => {
		this.requestInProgress = true;
		this.error = "";

		setTimeout(action(() => {
			if (title == "frick") {
				this.error = "No swears allowed!";
				reject();
			} else {
				resolve(420);
			}
			this.requestInProgress = false;
		}), 300);
	});

}
