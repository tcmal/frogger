//! Stores authentication state

import { observable, computed, action } from "mobx";
import { post_request } from "../util";

import LoadableMixin from "./LoadableMixin";

export default class PosterModel extends LoadableMixin {

	@action makePost = (sub, title, is_link, content) => {
		this.requestInProgress = true;
		this.error = "";

		return post_request("/subs/" + sub + "/posts", {
			title,
			isLink: is_link,
			content
		}).then(action(resp => {
			this.requestInProgress = false;

			return resp.id;
		})).catch(action(err => {
			this.requestInProgress = false;
			this.error = err.toString();
		}));
	};

}
