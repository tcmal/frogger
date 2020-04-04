//! Detail view for a post
import React from 'react';
import { observer } from 'mobx-react';
import { useParams, Link } from 'react-router-dom';


import { useStore } from '../context';
import PostComments from '../components/PostComments';
import PostContent from '../components/PostContent';
import { LoadableWrapper, PaginationWrapper } from "../components/Utils";

export default observer(({ forceAll }) => {

	const { post } = useStore();
	const { id } = useParams();

	// Make sure we load the right post
	post.setPost(id);

	return (
		<div className="postPage">
			<LoadableWrapper loadable={post}>
				<section className="post">
					<PostContent post={post.post} />
				</section>
				<section className="comments">
					<PostComments comments={post.comments} />
				</section>
			</LoadableWrapper>
		</div>
	)
});