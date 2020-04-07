//! Stores authentication state

import { observable, computed, action } from "mobx";

import LoadableMixin from "./LoadableMixin";
import { post_request, json_request } from "../util";

export default class SubModModel extends LoadableMixin {

	@observable
	redirect = ""

	@action createSub = (name, description) => new Promise((resolve, reject) => {
		this.requestInProgress = true;
		this.error = "";

		post_request("/subs", {
			name, description
		}).then(x => x.json())
		.then(action(resp => {
			this.requestInProgress = false;
			if (resp.error) {
				this.error = resp.error.message;
				reject(this.error);
			} else {
				resolve(resp.name);
			}
		}));
	})

	@action deletePost = (post) => {
		this.requestInProgress = true;
		return json_request("DELETE", "/posts/" + post.id)
			.then(x => x.length > 0 ? x.json() : {})
			.then(action(resp => {
				this.requestInProgress = false;
				if (resp.error) {
					this.error = resp.error.message;
				} else {
					// TODO: Toast success
					this.redirect = "/f/" + post.posted_to;
				}
			}));
	}

	@action deleteComment = (comment) => {
		console.log(comment);
		// TODO
	}

	@action redirectDone = () => {
		this.redirect = "";
	}
}
