//! State for /f/all (or home when not logged in)

import PaginationMixin from "./PaginationMixin";
import PostModel, { generatePost } from "./PostModel";
import { get_request } from "../util";

export default class HomePageModel extends PaginationMixin {
	// The field we sort by
	sorted_by = "created_at";
	
	doLoadAfter = () => get_request("/subs/all/posts")
		.then(resp => {
			return resp.map(x => new PostModel(x));
		});
}