import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

import VoteArrows from './VoteArrows';
import { PaginationWrapper } from './Utils';
import { friendlyTimeSince } from '../util';

export const PostComment = ({ comment }) => (
	<div className="commentContainer">
		<div className="comment">
			<VoteArrows votable={comment} />
			<div className="listing">
				<span className="poster">
					<Link to={"/u/" + comment.poster_name}>
						/u/{comment.poster_name}
					</Link>
				</span>
				<span className="time">{friendlyTimeSince(comment.created_at)}</span>

				<p className="content">
					{comment.content}
				</p>
			</div>
		</div>
		<div className="children">
			{comment.children.map(x =>
				<PostComment key={x.id} comment={x} />
			)}
		</div>
	</div>
);

export default observer(({ comments }) => (
	<PaginationWrapper pagable={comments} className="rootCommentsContainer">
		{comments.currentPage.map(x => 
			<PostComment key={x.id} comment={x} />
		)}
	</PaginationWrapper>
));