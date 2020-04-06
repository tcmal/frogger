//! Mixin for pagination

import { observable, computed, action } from "mobx";

import LoadableMixin from "./LoadableMixin";

/// To implement, override `sorted_by` and `doLoadAfter(after)`
/// Then use `.currentPage`, `.loadNextPage` and `.loadPrevPage`
/// or `components/PaginationWrapper`
export default class PaginationMixin extends LoadableMixin {
	@observable
	items = [];

	@observable
	after = undefined;

	@observable
	pageSize = 20;

	sorted_by = "";

	// Returns only what should be viewable on the page
	@computed get currentPage() {
		if (this.requestInProgress || this.error)
			return [];

		// If we have after, Find where it points at
		// Otherwise, 0
		let start = this.after !== undefined ? this.items.findIndex(x => x[this.sorted_by] > this.after) : 0;
		return this.items.slice(start, start + this.pageSize);
	}

	@computed get hasPrev() {
		return this.after !== undefined;
	}

	@action
	ensureNotEmpty = () => {
		if (this.items.length == 0 && !this.requestInProgress && !this.error) {
			this.loadNextPage();
		}
	}

	@action
	loadNextPage = () => {
		// If this is our initial load we don't need to set after
		// Otherwise, it's created_at of the last thing on our page
		if (this.items.length > 0)
			this.after = this.items[this.items.length - 1][this.sorted_by];

		// TODO: Make actual requests to server
		this.requestInProgress = true;
		this.error = "";
		this.doLoadAfter(this.after)
			.then(action('PaginationMixin.LoadDone', (result) => {
				this.items.push(...result)
				this.requestInProgress = false;
			}))
			.catch(action('PaginationMixin.LoadError', (error) => {
				console.log(error);
				this.error = error;
				this.requestInProgress = false;
			}));

	}

	@action
	loadPrevPage = () => {
		if (!this.hasPrev)
			return;
		
		// The current start of our page
		const startCur = this.items.findIndex(x => x[this.sorted_by] > this.after);
		const startPrev = startCur - this.pageSize; // Go back pageSize

		if (startPrev <= 0) {
			// undefined if we're at the start
			this.after = undefined;
		} else {
			// index of last thing on our page
			this.after = thisitems[startPrev - 1][this.sorted_by];
		}
	}

	@action
	clear = () => {
		this.items = [];
		this.after = undefined;
		this.loadNextPage();
	}

	@action
	setInitialItems = (items) => {
		this.items = items;
		this.after = undefined;
		
		if (this.items.length == 0) {
			this.error = "No more items!";
		}
	}

	doLoadAfter = (after) => {
		// This should be implemented by the mixin target
		// It should return a promise
		throw new Error("PaginationMixin.doLoadAfter should be overriden by the target class");
	}
}
