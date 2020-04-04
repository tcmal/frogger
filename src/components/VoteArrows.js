//! Provides vote arrows for anything that has VotableMixin

import React from "react";
import { observer } from "mobx-react";
import { useStore } from "../context";

export default observer(({ votable }) => {
	const { auth } = useStore();

	const canVote = auth.isLoggedIn;
	
	const hasUpvoted = votable.userVote.has_voted && votable.userVote.was_upvote;
	const hasDownvoted = votable.userVote.has_voted && !votable.userVote.was_upvote;

	let upFunc = hasUpvoted ? votable.clearVote : votable.upvote;
	let downFunc = hasDownvoted ? votable.clearVote : votable.downvote;
	if (!canVote) {
		upFunc = () => null;
		downFunc = upFunc;
	}

	return (
		<div className="voteArrows">
			<button className={"up " + (hasUpvoted ? 'active' : '')} onClick={upFunc}>↑</button>
			<span className="number">{votable.karma}</span>
			<button className={"down " + (hasDownvoted ? 'active' : '')} onClick={downFunc}>↓</button>
		</div>
	)
})