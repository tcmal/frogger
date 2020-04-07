import React from 'react';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';

import CommentModel from '../models/CommentModel';
import { StoreContext } from '../context';
import { post_request } from '../util';

@observer
export default class NewCommentForm extends React.Component {
	static contextType = StoreContext;

	constructor(props) {
		super(props);

		// Setup initial state
		this.state = {
			requestInProgress: false,
			error: "",
			content: "",
		};
	}

	render() {
		const { auth } = this.context;
		const { requestInProgress, error, content } = this.state;

		// Can't post if not logged in
		if (!auth.isLoggedIn) {
			return <div />
		}

		return (
			<section className="newCommentFormContainer">
				<form onSubmit={this.handleSubmit} className={"newCommentForm " + (requestInProgress ? 'disabled' : '')}>
					<textarea value={content} onChange={this.updateValue.bind(this, "content")}
						cols="100"
						rows="10" />

					<input type="submit" value="Comment" className="btn primary" />
				</form>
				
				{error ? <p className="error">{error}</p> : ''}
			</section>
		);
	}

	handleSubmit = (e) => {
		e.preventDefault();

		// Dispatch the action
		const { postId, replyTo, onFinishPostingComment } = this.props;
		const { content } = this.state;

		this.setState({...this.state, requestInProgress: true, error: ""});
		
		post_request("/posts/" + postId + "/comments", {
			replyTo,
			content,
		}).then(resp => {
			this.context.post.comments.acceptNewComment(new CommentModel(resp));
		}).catch(err => {
			this.setState({...this.state, requestInProgress: false, error: err.toString()});
		});;
	}

	// Helper to update form values
	updateValue(name, e) {
		this.setState({...this.state, [name]: e.target.value});
	}
}