//! State for the post detail page (/p/:id)

import { observable, computed, action } from "mobx";

import PostModel from "./PostModel";
import { generateComment } from "./CommentModel";
import PaginationMixin from "./PaginationMixin";
import LoadableMixin from "./LoadableMixin";

export default class PostDetailModel extends LoadableMixin {
	/// The post we're looking at
	@observable
	post = null;

	/// All its comments. This won't be populated till after `post`` is loaded
	@observable
	comments = null;

	@action
	setPost = (id) => {
		if (this.requestInProgress || this.error || (this.post && this.post.id == id))
			return;

		this.requestInProgress = true;
		this.error = "";

		// TODO: Make actual request to server
		setTimeout(action(() => {
			if (this.id === 42) {
				this.error = "Post not found!";
			} else {
				this.post = new PostModel(id, "Post #" + id, false, "Lorem Ipsum...", "user" + id, "sub" + id, new Date());
				this.comments = new PostCommentsModel(id);
				this.comments.ensureNotEmpty();
			}

			this.requestInProgress = false;
		}), 500);
	}
}

/// Comments on a post
export class PostCommentsModel extends PaginationMixin {
	sorted_by = "created_at"

	constructor(post_id){
		super();

		this.post_id = post_id;
	}

	doLoadAfter = (after) => new Promise((resolve, reject) => {
		setTimeout(() => {
			// Simulate an error
			if (this.items.length > 40) {
				reject("No more comments!");
			} else {
				let comments = [];
				for (let i = 0; i < this.pageSize; i++) {
					comments.push(generateComment());
				}
				console.log(comments);
				resolve(comments);
			}
		}, 300);
	})
}