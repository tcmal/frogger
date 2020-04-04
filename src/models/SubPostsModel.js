import { observable, computed, action } from "mobx";

import PostModel, { generatePost } from "./PostModel";
import SubModel from "./SubModel";

export default class SubPostsModel {
	@observable
	posts = [];

	@observable
	after = undefined;

	@observable
	pageSize = 20;

	@observable
	loadedSub = null;

	@observable
	requestInProgress = false;

	@observable
	error = "";

	@computed get currentPage() {
		if (this.error)
			return [];

		let start = this.after !== undefined ? this.posts.findIndex(x => x.created_at > this.after) : 0;

		return this.posts.slice(start, start + this.pageSize);
	}

	@computed get hasPrev() {
		return this.after !== undefined;
	}

	@action
	loadPrevPage = () => {
		if (!this.hasPrev || !this.loadedSub)
			return;

		const startCur = this.posts.findIndex(x => x.created_at > this.after);
		const startPrev = startCur - this.pageSize;

		if (startPrev <= 0) {
			this.after = undefined;
		} else {
			this.after = posts[startPrev - 1].created_at;
		}
	}

	@action
	loadNextPage = () => {
		if (!this.loadedSub)
			return;

		if (this.posts.length > 0)
			this.after = this.posts[this.posts.length - 1].created_at;

		// TODO: Make actual requests to server
		this.requestInProgress = true;
		this.error = "";

		setTimeout(action(() => {
			// Simulate an error
			if (this.posts.length > 40) {
				this.error = "No more posts!";
			} else {
				for (let i = 0; i < this.pageSize; i++) {
					this.posts.push(generatePost(this.loadedSub.name));
				}
			}
			this.requestInProgress = false;
		}), 1000);
	}

	@action
	setLoadedSub = (name) => {
		this.loadedSub = new SubModel(name);

		this.posts = []
		this.after = undefined
		this.loadNextPage();
	}
}