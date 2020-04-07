//! Stores authentication state

import { observable, computed, action } from "mobx";

import LoadableMixin from "./LoadableMixin";
import { post_request, json_request } from "../util";

export default class SubModModel extends LoadableMixin {

	@observable
	redirect = ""

	@action createSub = (name, description) =>  {
		this.requestInProgress = true;
		this.error = "";

		return post_request("/subs", {
			name, description
		}).then(action(resp => {
			this.requestInProgress = false;

			return resp.name;
		})).catch(action(err => {
			this.requestInProgress = false;
			this.error = err.toString();
		}));
	}

	@action deletePost = (post) => {
		this.requestInProgress = true;
		return json_request("DELETE", "/posts/" + post.id)
			.then(action(resp => {
				this.requestInProgress = false;
				
				// TODO: Toast success
				this.redirect = "/f/" + post.posted_to;
			})).catch(action(err => {
				this.requestInProgress = false;
				this.error = err.toString();
			}));
	}

	@action deleteComment = (comment) => {
		this.requestInProgress = true;

		return json_request("DELETE", "/posts/" + comment.postId + "/comments", {
			commentId: comment.id,
		}).then(action(resp => {
			this.requestInProgress = false;
		})).catch(action(err => {
			this.requestInProgress = false;
			this.error = err.toString();
		}));
	}

	@action redirectDone = () => {
		this.redirect = "";
	}
}
