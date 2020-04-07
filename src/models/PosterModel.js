//! Stores authentication state

import { observable, computed, action } from "mobx";
import { post_request } from "../util";

import LoadableMixin from "./LoadableMixin";

export default class PosterModel extends LoadableMixin {

	@action makePost = (sub, title, is_link, content) => new Promise((resolve, reject) => {
		this.requestInProgress = true;
		this.error = "";

		post_request("/subs/" + sub + "/posts", {
			title,
			isLink: is_link,
			content
		}).then(x => x.json())
		.then(action(resp => {
			this.requestInProgress = false;
			if (resp.error) {
				this.error = resp.error.message;
				reject(this.error);
			} else {
				resolve(resp.id);
			}
		}));
	});

}
