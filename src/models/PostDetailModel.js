import { observable, computed, action } from "mobx";

import PostModel from "./PostModel";
import { generateComment } from "./CommentModel";

export default class PostDetailModel {
	@observable
	post = null;

	@observable
	postIsLoading = false;

	@observable
	comments = [];

	@observable
	after = undefined;

	@observable
	pageSize = 20;

	@observable
	requestInProgress = false;

	@observable
	error = "";

	@computed get currentPage() {
		if (this.error)
			return [];

		let start = this.after !== undefined ? this.comments.findIndex(x => x.created_at > this.after) : 0;

		return this.comments.slice(start, start + this.pageSize);
	}

	@computed get hasPrev() {
		return this.after !== undefined;
	}

	@action
	loadPrevPage = () => {
		if (!this.hasPrev || !this.post)
			return;

		const startCur = this.comments.findIndex(x => x.created_at > this.after);
		const startPrev = startCur - this.pageSize;

		if (startPrev <= 0) {
			this.after = undefined;
		} else {
			this.after = comments[startPrev - 1].created_at;
		}
	}

	@action
	loadNextPage = () => {
		if (!this.post)
			return;

		if (this.comments.length > 0)
			this.after = this.comments[this.comments.length - 1].created_at;

		// TODO: Make actual requests to server
		this.requestInProgress = true;
		this.error = "";

		setTimeout(action(() => {
			// Simulate an error
			if (this.comments.length > 40) {
				this.error = "No more comments!";
			} else {
				for (let i = 0; i < this.pageSize; i++) {
					this.comments.push(generateComment());
				}
			}
			this.requestInProgress = false;
		}), 1000);
	}

	@action
	setPost = (id) => {
		this.postIsLoading = true;
		setTimeout(action(() => {
			this.post = new PostModel(id, "Post #" + id, false, "Lorem Ipsum...", "user" + id, "sub" + id, new Date());
			this.postIsLoading = false;
			
			this.loadNextPage();
		}), 500);
		
		this.comments = []
		this.after = undefined
	}
}