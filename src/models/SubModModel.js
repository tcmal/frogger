//! Stores authentication state

import { observable, computed, action } from "mobx";

import LoadableMixin from "./LoadableMixin";

export default class SubModModel extends LoadableMixin {

	modded_sub_names = []

	@action createSub = (name, description) => new Promise((resolve, reject) => {
		this.requestInProgress = true;
		this.error = "";

		setTimeout(action(() => {
			if (name == "info") {
				this.error = "Name already taken";
				reject();
			} else {
				this.modded_sub_names.push(name);
				resolve();
			}
			this.requestInProgress = false;
		}), 300);
	})

	@action deletePost = (post) => {
		console.log(post);
		// TODO
	}

	@action deleteComment = (comment) => {
		console.log(comment);
		// TODO
	}
}
