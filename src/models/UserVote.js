import { observable } from "mobx";

export default class UserVote {
	@observable
	has_voted = false

	@observable
	was_upvote = false
}