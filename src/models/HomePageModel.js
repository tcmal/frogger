//! State for a user's homepage (/ when logged in)

import PaginationMixin from "./PaginationMixin";
import PostModel, { generatePost } from "./PostModel";
import { get_request } from "../util";

// At some point this will be factored out into one class for user home (store.home)
// and one class for /all page (store.all)
export default class HomePageModel extends PaginationMixin {
	// The field we sort by
	sorted_by = "created_at";
	
	doLoadAfter = () => get_request("/me/home").then(x => x.json())
		.then(resp => {
			if (resp.error) {
				throw resp.error.message;
			} else {
				return resp.map(x => new PostModel(x));
			}
		})
}