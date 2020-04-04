import React from 'react';
import { Link } from 'react-router-dom';

import { friendlyTimeSince } from '../util';

export const PostComment = ({ comment }) => (
	<div className="commentContainer">
		<div className="comment">
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
		<div className="children">
			{comment.children.map(x =>
				<PostComment key={x.id} comment={x} />
			)}
		</div>
	</div>
);

export default ({ comments, onNextPage, onPrevPage, hasPrev }) => (
	<div className="rootCommentsContainer">
		{comments.map(x => 
			<PostComment key={x.id} comment={x} />
		)}
		
		{hasPrev ? <button onClick={onPrevPage} className="btn prev">Previous</button> : ''}
		<button onClick={onNextPage} className="btn next">Next</button>
	</div>
);