import React from 'react';
import { observer } from 'mobx-react';
import { friendlyTimeSince } from '../util';
import { Link } from 'react-router-dom';

import { PaginationWrapper } from './Utils';

export const PostListItem = ({ item }) => (
	<div className="post">
		<Link to={"/p/" + item.id} className="supressLinkStyling">
			<h3 className="title">{item.title}</h3>
		</Link>
		<span className="time">{friendlyTimeSince(item.created_at)}</span>
		<span className="poster">
			<Link to={"/u/" + item.poster_name}>
				/u/{item.poster_name}
			</Link>
		</span>
		<span className="sub">
			<Link to={"/f/" + item.posted_to}>
				/f/{item.posted_to}
			</Link>
		</span>
	</div>
);

export default observer(({ postList }) => (
	<PaginationWrapper pagable={postList} className="postList">
		{postList.currentPage.map(x => 
			<PostListItem key={x.id} item={x} />
		)}
	</PaginationWrapper>
));