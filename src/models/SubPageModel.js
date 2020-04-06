//! Data for sub page (/s/:id)

import { observable, computed, action } from "mobx";

import PostModel, { generatePost } from "./PostModel";
import SubModel from "./SubModel";
import LoadableMixin from "./LoadableMixin";
import PaginationMixin from "./PaginationMixin";
import { get_request } from "../util";

export default class SubPageModel extends LoadableMixin{

	@observable
	sub = null;
	
	/// Posts for this sub. This shouldn't be accessed until after 
	/// sub is loaded
	@observable
	posts = []

	@action
	setLoadedSub = (name) => {
		if (this.requestInProgress || this.error || (this.sub && this.sub.name == name))
			return;

		this.requestInProgress = true;
		this.error = "";

		get_request("/subs/" + name + "/posts")
			.then(x => x.json())
			.then(action(resp => {
				this.requestInProgress = false;
				if (resp.error) {
					this.error = resp.error.message;
				} else {
					this.sub = new SubModel(resp.subforum);
					this.posts = new SubPostModel(name);

					this.posts.setInitialItems(resp.posts.map(x => new PostModel(x)));
				}
			}));
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