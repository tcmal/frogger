//! Data for a post
import { observable } from "mobx";

// TODO: When we implement the server, we probably won't get content, etc. till in the detail view

/// Used in post lists and in PostDetail.post
export default class PostModel {
	id = 0
	title = "";
	is_link = false;
	content = "";
	poster_name = "";
	posted_to = "";
	created_at = new Date();

	constructor(id, title, is_link, content, poster_name, posted_to, created_at) {
		this.id = id;
		this.title = title;
		this.is_link = is_link;
		this.content = content;
		this.poster_name = poster_name;
		this.posted_to = posted_to;
		this.created_at = created_at;
	}
}


let postId = 0;
let last_posted_at = new Date('2010-01-01 00:00:00');

/// Generate a new post, using `overridesub` as the sub if specified
/// This always gives a post posted after the previous generation
export const generatePost = (overridesub=undefined) => {
	let id = postId++;
	last_posted_at.setHours(last_posted_at.getHours() + 1);
	let posted = new Date(last_posted_at);
	return new PostModel(id, "Post #" + id, false, "Lorem Ipsum...", "user" + id, overridesub || "sub" + id, posted);
}