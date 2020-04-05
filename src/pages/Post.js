//! Detail view for a post
import React from 'react';
import { observer } from 'mobx-react';
import { useParams, Link } from 'react-router-dom';


import { useStore } from '../context';
import PostComments from '../components/PostComments';
import PostContent from '../components/PostContent';
import { LoadableWrapper, PaginationWrapper } from "../components/Utils";

export default observer(({ forceAll }) => {

	const { post, subMod } = useStore();
	const { id } = useParams();

	// Make sure we load the right post
	post.setPost(id);

	const showModActions = post.post && subMod.modded_sub_names.includes(post.post.posted_to);

	return (
		<div className="postPage">
			<LoadableWrapper loadable={post}>
				<section className="post">
					<PostContent post={post.post}
						showModActions={showModActions} 
						onDelete={subMod.deletePost} />
				</section>
				<section className="comments">
					<PostComments comments={post.comments}
						showModActions={showModActions} 
						onDelete={subMod.deleteComment} />
				</section>
			</LoadableWrapper>
		</div>
	)
});