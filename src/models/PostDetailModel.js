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

	@observable
	loading_post = null;

	/// All its comments. This won't be populated till after `post`` is loaded
	@observable
	comments = null;

	@action
	setPost = (id) => {
		if (this.loading_post === id && (this.requestInProgress || this.error || this.post))
			return;

		this.loading_post = id;
		this.post = null;
		this.requestInProgress = true;
		this.error = "";

		get_request("/posts/" + id + "/comments")
			.then(action(resp => {
				this.requestInProgress = false;
				
				this.post = new PostModel(resp.post);
				this.comments = new PostCommentsModel(id);

				this.comments.setInitialItems(resp.comments.map(x => new CommentModel(x)));
			}))
			.catch(action(err => {
				this.requestInProgress = false;
				this.error = err.toString();
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

	doLoadAfter = (after) => get_request("/posts/" + this.post_id + "/comments" + (after ? ("?after=" + after.toISOString()) : ''))
		.then(resp => {
			if (resp.error)
				throw new Error(resp.error.message);

			return resp.comments.map(x => new CommentModel(x));
		});

	@action
	acceptNewComment = (comment) => {
		//TODO
		this.clear();
	}
}