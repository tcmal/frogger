
import { observable, computed, action } from "mobx";

import PaginationMixin from "./PaginationMixin";
import SubModel from "./SubModel";

import { get_request } from "../util";

export default class SubscriptionListModel extends PaginationMixin {
	sorted_by = "name"

	doLoadAfter = (after) => get_request("/me/relations?after=" + (after || ""))
		.then(action(resp => {
			if (resp.length === 0) {
				throw new Error("No subscriptions!");
			} else {
				return resp.map(x => new SubModel(x));
			}
		}));
}