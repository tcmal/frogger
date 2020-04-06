//! State for the post detail page (/p/:id)

import { observable, computed, action } from "mobx";

import PostModel from "./PostModel";
import CommentModel from "./CommentModel";
import { generateComment } from "./CommentModel";
import PaginationMixin from "./PaginationMixin";
import LoadableMixin from "./LoadableMixin";

import { get_request } from "../util";

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

		get_request("/posts/" + id + "/comments")
			.then(x => x.json())
			.then(action(resp => {
				this.requestInProgress = false;
				console.log('hellooo11!!!!');
				console.log(this);
				if (resp.error) {
					this.error = resp.error.message;
				} else {
					this.post = new PostModel(resp.post);
					this.comments = new PostCommentsModel(id);

					this.comments.setInitialItems(resp.comments.map(x => new CommentModel(x)));

					console.log(this);
				}
			}));
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
				resolve(comments);
			}
		}, 300);
	})
}