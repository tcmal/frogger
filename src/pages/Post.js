//! Detail view for a post
import React from 'react';
import { observer } from 'mobx-react';
import { useParams, Link } from 'react-router-dom';

import { useStore } from '../context';
import PostComments from '../components/PostComments';
import PostContent from '../components/PostContent';

export default observer(({ forceAll }) => {

	const { post } = useStore();
	const { id } = useParams();

	// Make sure we load the right post
	if ((!post.post || post.post.id != id) && !post.postIsLoading)
		post.setPost(id);

	if (post.postIsLoading) 
		return (
			<div className="postPage">
				<p className="loading">Loading...</p>
			</div>
		);

	return (
		<div className="postPage">
			<section className="post">
				<PostContent post={post.post} />
			</section>
			<section className="comments">
				{post.requestInProgress ? <p className="loading">Loading...</p>
					: ''}
				{post.error ? <p className="error">{post.error}</p>
					: ''}

				<PostComments
					comments={post.currentPage}
					onNextPage={post.loadNextPage}
					onPrevPage={post.loadPrevPage}
					hasPrev={post.hasPrev} />
			</section>
		</div>
	)
});