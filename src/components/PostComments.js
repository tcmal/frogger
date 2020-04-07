import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { sanitize } from "dompurify";

import VoteArrows from './VoteArrows';
import NewCommentForm from './NewCommentForm';
import { PaginationWrapper } from './Utils';
import { friendlyTimeSince } from '../util';
import { StoreContext } from '../context';

@observer
export class PostComment extends React.Component {
	static contextType = StoreContext;

	constructor(props) {
		super(props);

		this.state = {
			isReplying: false,
		};
	}
	render() {
		const { comment, showModActions, onDelete } = this.props;
		const { auth, post } = this.context;
		const { isReplying} = this.state;

		return (
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

						{auth.isLoggedIn ? 
							<span className="reply action" onClick={() => this.setState({...this.state, isReplying: !isReplying})}>
								{isReplying ? 'Cancel' : 'Reply'}
							</span>
							: ''}

						{showModActions ? 
							<span className="delete action" onClick={() => onDelete(comment)}>
								Delete
							</span>
							: ''}

						<p className="content" dangerouslySetInnerHTML={{__html: sanitize(comment.content)}}></p>
					</div>
				</div>
				<div className="children">
					{isReplying ? <NewCommentForm replyTo={comment.id} postId={comment.postId} />
						: ''}
					{comment.children.map(x =>
						<PostComment key={x.id} comment={x} showModActions={showModActions} onDelete={onDelete} />
					)}
				</div>
			</div>
		);
	}
}

export default observer(({ post, comments, showModActions, onDelete }) => (
	<div className="commentsSection">
		<NewCommentForm postId={post.id} />
		<PaginationWrapper pagable={comments} className="rootCommentsContainer" showRefresh={true}>
			{comments.currentPage.map(x => 
				<PostComment key={x.id} comment={x} showModActions={showModActions} onDelete={onDelete} />
			)}
		</PaginationWrapper>
	</div>
));