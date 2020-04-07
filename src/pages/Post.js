//! Detail view for a post
import React from 'react';
import { observer } from 'mobx-react';
import { withRouter, Link, Redirect } from 'react-router-dom';

import { StoreContext } from '../context';
import PostComments from '../components/PostComments';
import PostContent from '../components/PostContent';
import { LoadableWrapper, PaginationWrapper } from "../components/Utils";

@observer
class PostPage extends React.Component {
	static contextType = StoreContext;
	constructor(props) {
		super(props)
		this.state = {
			redirect: ""
		}
	}
	render() {
		const { forceAll, match } = this.props;
		const { post, auth, subMod } = this.context;
		const { id } = match.params;

		// Make sure we load the right post
		post.setPost(id);

		if (this.state.redirect) {
			return (<Redirect to={this.state.redirect} />)
		}

		const showModActions = post.post && auth.isLoggedIn && post.post.subforum.ownerName === auth.loggedInUser.username;

		return (
			<div className="postPage">
				<LoadableWrapper loadable={post}>
					<LoadableWrapper loadable={subMod}>
						<section className="post">
							<PostContent post={post.post}
								showModActions={showModActions} 
								onDelete={this.deletePost} />
						</section>
						<section className="comments">
							<PostComments post={post.post}
								comments={post.comments}
								showModActions={showModActions} />
						</section>
					</LoadableWrapper>
				</LoadableWrapper>
			</div>
		)
	};

	deletePost = (post) => {
		this.context.subMod.deletePost(post)
			.then(_ => {
				this.setState({
					...this.state,
					redirect: "/f/" + this.context.post.post.posted_to
				})
			})
			.catch(action(err => {
				this.requestInProgress = false;
				this.error = err.toString();
			}));
	}
}

export default withRouter(PostPage);