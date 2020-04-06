//! Indiciates something can be voted on.
import { observable, computed, action } from "mobx";

import { post_request } from "../util";

import UserVote from "./UserVote";

export default class VotableMixin {
	@observable
	votesExclUser = 0
	
	@observable
	userVote = new UserVote();

	constructor(objectType, objectId) {
		this.objectType = objectType;
		this.objectId = objectId;
	}

	@computed get karma() {
		if (this.userVote.has_voted) {
			return this.votesExclUser + (this.userVote.was_upvote ? 1 : -1);
		} else {
			return this.votesExclUser;
		}
	}

	submitVote = (vote) =>
		post_request("/votes", {
			objectType: this.objectType,
			objectId: this.objectId,
			vote
		}).then(x => !x.ok ? x.json() : {})
		.then(resp => {
			if (resp.error) {
				throw new Error(resp.error.message);
			}
		}).catch(action(err => {
			// TODO: Toast error
			console.log(err);
			if (vote === "clear")
				this.userVote.has_voted = true;
			else 
				this.userVote.has_voted = false;
		}));

	@action
	upvote = () => {
		this.userVote.has_voted = true;
		this.userVote.was_upvote = true;

		this.submitVote("up");
	}

	@action
	downvote = () => {
		this.userVote.has_voted = true;
		this.userVote.was_upvote = false;
	
		this.submitVote("down");
	}

	@action
	clearVote = () => {
		this.userVote.has_voted = false;
		this.userVote.was_upvote = false;
	
		this.submitVote("clear");
	}
}