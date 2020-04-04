import React from 'react';
import { Link } from 'react-router-dom';

import { friendlyTimeSince } from '../util';
import VoteArrows from "./VoteArrows";

export default ({ post }) => (
	<div className="postDetailContainer">
		<VoteArrows votable={post} />
		<div className="postDetail">
			{post.is_link ? <a className="supressLinkStyling"  href={post.content}><h1 className="title link">{post.title}</h1></a>
				: <h1 className="title">{post.title}</h1>}
			
			{post.is_link ? ''
				: <p className="content">{post.content}</p>}
			
			<span className="time">{friendlyTimeSince(post.created_at)}</span>
			<span className="poster">
				<Link to={"/u/" + post.poster_name}>
					/u/{post.poster_name}
				</Link>
			</span>
			<span className="sub">
				<Link to={"/f/" + post.posted_to}>
					/f/{post.posted_to}
				</Link>
			</span>
		</div>
	</div>
);