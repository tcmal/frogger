//! Represents a comment on a post

import VotableMixin from "./VotableMixin";
import { observable } from "mobx";
import UserVote from "./UserVote";

export default class CommentModel extends VotableMixin {
	id = 0
	postId = 0
	content = ""
	poster_name = ""
	created_at = new Date()
	children = []

	constructor({commentId, postId, content, userName, createdAt, replies=[], votesExclUser=0, userVote}) {
		super('comment', commentId);

		this.id = commentId;
		this.postId = postId;
		this.content = content;
		this.poster_name = userName;
		this.created_at = new Date(createdAt);
		this.votesExclUser = votesExclUser;

		this.children = replies.map(x => new CommentModel(x));
	
		this.userVote = new UserVote();
		if (userVote) {
			this.userVote.has_voted = true;
			this.userVote.was_upvote = userVote.isUpvote;
		}
	}
}