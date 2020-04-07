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

	@observable
	loading_sub = ""
	
	/// Posts for this sub. This shouldn't be accessed until after 
	/// sub is loaded
	@observable
	posts = []

	@action
	setLoadedSub = (name) => {
		if (this.loading_sub === name && (this.requestInProgress || this.error || this.sub))
			return;

		this.requestInProgress = true;
		this.loading_sub = name;
		this.error = "";

		get_request("/subs/" + name + "/posts")
			.then(action(resp => {
				this.requestInProgress = false;
				
				this.sub = new SubModel(resp.subforum);
				this.posts = new SubPostModel(name);

				this.posts.setInitialItems(resp.posts.map(x => new PostModel(x)));

			})).catch(action(err => {
				this.requestInProgress = false;
				this.error = err.toString();
			}));
	}
}

export class SubPostModel extends PaginationMixin {
	sorted_by = "created_at"

	constructor(sub_name) {
		super();

		this.sub_name = sub_name;
	}

	doLoadAfter = (after) => get_request("/subs/" + name + "/posts" + (after ? '?after=' + after.toISOString() : ''))
		.then(action(resp => {
			this.requestInProgress = false;

			return resp.posts.map(x => new PostModel(x));
			
		}));
}