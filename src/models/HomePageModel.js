import { observable, computed, action } from "mobx";

import PostModel, { generatePost } from "./PostModel";

export default class HomePageModel {
	@observable
	posts = [];

	@observable
	after = undefined;

	@observable
	pageSize = 20;

	@computed get currentPage() {
		let start = this.after !== undefined ? this.posts.findIndex(x => x.created_at > this.after) : 0;

		return this.posts.slice(start, start + this.pageSize);
	}

	@action
	loadNextPage() {
		if (this.posts.length > 0)
			this.after = this.posts[this.posts.length - 1].created_at;

		for (let i = 0; i < this.pageSize; i++) {
			this.posts.push(generatePost())
		}
	}

	constructor() {
		this.loadNextPage();
	}
}
