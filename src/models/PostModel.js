//! Data for a post
import VotableMixin from "./VotableMixin";
import SubModel from  "./SubModel";
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
	is_mod = false;
	created_at = new Date();

	constructor({id, title, isLink, content, postedBy, postedTo="", subforum={}, createdAt, votesExclUser, userVote}) {
		super('post', id);
		
		this.id = id;
		this.title = title;
		this.is_link = isLink;
		this.content = content;
		this.poster_name = postedBy;
		if (subforum) {
			this.subforum = new SubModel(subforum);
		}
		if (!postedTo) {
			this.posted_to = subforum.name;
		} else {
			this.posted_to = postedTo;
		}
		this.created_at = new Date(createdAt);
		this.votesExclUser = votesExclUser;
		this.userVote = new UserVote();
		if (userVote) {
			this.userVote.has_voted = true;
			this.userVote.was_upvote = userVote.isUpvote;
		}
	}
}