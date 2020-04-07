//! State for a user's homepage (/ when logged in)

import PaginationMixin from "./PaginationMixin";
import PostModel, { generatePost } from "./PostModel";
import { get_request } from "../util";

export default class HomePageModel extends PaginationMixin {
	// The field we sort by
	sorted_by = "created_at";
	
	doLoadAfter = (after) => get_request("/me/home/" + (after ? ("?after=" + after.toISOString()) : '')).then(x => x.json())
		.then(resp => {
			if (resp.error) {
				throw resp.error.message;
			} else {
				return resp.map(x => new PostModel(x));
			}
		})
}