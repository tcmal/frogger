
import { observable, computed, action } from "mobx";

import PaginationMixin from "./PaginationMixin";
import SubModel from "./SubModel";

export default class SubscriptionListModel extends PaginationMixin {
	sorted_by = "name"

	doLoadAfter = (after) => new Promise((resolve, reject) => {
		setTimeout(() => {
			// Simulate an error
			if (this.items.length > 40) {
				reject("No more subscriptions!");
			} else {
				let subs = [];
				for (let i = 0; i < 20; i++) {
					subs.push(new SubModel("sub" + i.toString()));
				}

				resolve(subs);
			}
		});
	})
}