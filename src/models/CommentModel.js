import { observable } from "mobx";

export default class CommentModel {
	id = 0
	content = ""
	poster_name = ""
	created_at = new Date()
	children = []

	constructor(id, content, poster_name, created_at) {
		this.id = id;
		this.content = content
		this.poster_name = poster_name
		this.created_at = created_at
	}
}


let commentId = 0;
let last_posted_at = new Date('2010-01-01 00:00:00');

export const generateComment = (level=3) => {
	let id = commentId++;
	
	last_posted_at.setHours(last_posted_at.getHours() + 1);
	let posted = new Date(last_posted_at);

	let comment = new CommentModel(id, "Comment #" + id, "user" + id, posted);
	
	if (level <= 0) {
		return comment;
	}

	comment.children.push(generateComment(level - 1));

	return comment;
}