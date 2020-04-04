import React from 'react';
import { observer } from 'mobx-react';

export const PostListItem = ({ item }) => (
	<div className="post">
		<h3 className="title">{item.title}</h3>
		<span className="poster">{item.poster_name}</span>
		<span className="sub">{item.posted_to}</span>
	</div>
);

export default observer(({ onNextPage, onPrevPage, contents, hasPrev }) => (
	<section className="postList">
		{contents.map(x => 
			<PostListItem key={x.id} item={x} />
		)}

		{hasPrev ? <button onClick={onPrevPage} className="btn">Previous</button> : ''}
		<button onClick={onNextPage} className="btn">Next</button>
	</section>
));