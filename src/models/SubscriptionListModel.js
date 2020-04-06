
import { observable, computed, action } from "mobx";

import PaginationMixin from "./PaginationMixin";
import SubModel from "./SubModel";

import { get_request } from "../util";

export default class SubscriptionListModel extends PaginationMixin {
	sorted_by = "name"

	doLoadAfter = (after) => new Promise((resolve, reject) => {
		get_request("/me/relations?after=" + (after || ""))
			.then(x => x.json())
			.then(action(resp => {
				if (resp.error) {
					reject(resp.error.message);
				} else if (resp.length === 0) {
					reject("No subscriptions!");
				} else {
					resolve(resp.map(x => new SubModel(x)));
				}

			}));
	})
}