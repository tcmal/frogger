//! Indiciates something can be voted on.
import { observable, computed, action } from "mobx";

import UserVote from "./UserVote";

export default class VotableMixin {
	@observable
	votesExclUser = 0
	
	@observable
	userVote = new UserVote();

	@computed get karma() {
		if (this.userVote.has_voted) {
			return this.votesExclUser + (this.userVote.was_upvote ? 1 : -1);
		} else {
			return this.votesExclUser;
		}
	}

	@action
	upvote = () => {
		this.userVote.has_voted = true;
		this.userVote.was_upvote = true;
	}

	@action
	downvote = () => {
		this.userVote.has_voted = true;
		this.userVote.was_upvote = false;
	}

	@action
	clearVote = () => {
		this.userVote.has_voted = false;
		this.userVote.was_upvote = false;
	}
}