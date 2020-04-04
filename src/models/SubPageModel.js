//! Data for sub page (/s/:id)

import { observable, computed, action } from "mobx";

import PostModel, { generatePost } from "./PostModel";
import SubModel from "./SubModel";
import LoadableMixin from "./LoadableMixin";
import PaginationMixin from "./PaginationMixin";

export default class SubPageModel extends LoadableMixin{

	@observable
	sub = null;
	
	/// Posts for this sub. This shouldn't be accessed until after 
	/// sub is loaded
	@observable
	posts = []

	@action
	loadNextPage = () => {
		if (this.posts.length > 0)
			this.after = this.posts[this.posts.length - 1].created_at;

		// TODO: Make actual requests to server
		this.requestInProgress = true;
		this.error = "";


	}

	@action
	setLoadedSub = (name) => {
		if (this.requestInProgress || this.error || (this.sub && this.sub.name == name))
			return;

		this.requestInProgress = true;
		this.error = "";

		setTimeout(action(() => {
			this.sub = new SubModel(name);
			this.posts = new SubPostModel(name);
			this.posts.ensureNotEmpty();
			
			this.requestInProgress = false;
		}), 300);
	}
}

export class SubPostModel extends PaginationMixin {
	sorted_by = "created_at"

	constructor(sub_name) {
		super();

		this.sub_name = sub_name;
	}

	doLoadAfter = (after) => new Promise((resolve, reject) => {
		setTimeout(() => {
			// Simulate an error
			if (this.items.length > 40) {
				reject("No more posts!");
			} else {
				let posts = [];
				for (let i = 0; i < this.pageSize; i++) {
					posts.push(generatePost(this.sub_name));
				}

				resolve(posts);
			}
			this.requestInProgress = false;
		}, 1000);
	})
}