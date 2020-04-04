//! State for a user's homepage (/ when logged in)

import PaginationMixin from "./PaginationMixin";
import PostModel, { generatePost } from "./PostModel";

// At some point this will be factored out into one class for user home (store.home)
// and one class for /all page (store.all)
export default class HomePageModel extends PaginationMixin {
	// The field we sort by
	sorted_by = "created_at";
	
	doLoadAfter = () => new Promise((resolve, reject) => {
		setTimeout(() => {
			// Simulate an error
			if (this.items.length > 40) {
				reject("No more posts!");
			} else {
				let posts = [];
				for (let i = 0; i < 20; i++) {
					posts.push(generatePost());
				}

				resolve(posts);
			}
		}, 1000);
	})
}