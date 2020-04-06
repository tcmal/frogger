//! Data for a post
import VotableMixin from "./VotableMixin";
import UserVote from "./UserVote";

// TODO: When we implement the server, we probably won't get content, etc. till in the detail view

/// Used in post lists and in PostDetail.post
export default class PostModel extends VotableMixin {
	id = 0
	title = "";
	is_link = false;
	content = "";
	poster_name = "";
	posted_to = "";
	created_at = new Date();

	constructor({id, title, isLink, content, postedBy, postedTo, createdAt, votesExclUser, userVote}) {
		super();
		
		this.id = id;
		this.title = title;
		this.is_link = isLink;
		this.content = content;
		this.poster_name = postedBy;
		this.posted_to = postedTo;
		this.created_at = new Date(createdAt);
		this.votesExclUser = votesExclUser;
		this.userVote = new UserVote();
		if (userVote) {
			this.userVote.has_voted = true;
			this.userVote.was_upvote = userVote.isUpvote;
		}
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
	return new PostModel({id, title:"Post #" + id, isLink: false, content: "Lorem Ipsum...", postedBy: "user" + id, postedTo: overridesub || "sub" + id, createdAt: posted, votesExclUser: 0});
}