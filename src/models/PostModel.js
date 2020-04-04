import { observable } from "mobx";

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

export const generatePost = () => {
	let id = postId++;
	last_posted_at.setHours(last_posted_at.getHours() + 1);
	let posted = new Date(last_posted_at);
	return new PostModel(id, "Post #" + id, false, "Lorem Ipsum...", "user" + id, "sub" + id, posted);
}