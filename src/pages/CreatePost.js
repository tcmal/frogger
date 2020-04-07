import React from 'react';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';

import { StoreContext } from '../context';

@observer
export default class CreatePostPage extends React.Component {
	static contextType = StoreContext;

	constructor(props) {
		super(props);

		// Setup initial state
		this.state = {
			sub: "",
			title: "",
			content: ""
		};
	}

	render() {
		const { auth, poster } = this.context;

		// Redirect home if user is logged in
		if (!auth.isLoggedIn) {
			return <Redirect to="/login" />
		}

		if (this.state.redirect) {
			return <Redirect to={this.state.redirect} />
		}

		return (
			<main className="registerPage formPage formContainer">
				<h1 className="pageTitle">Create a post</h1>
				{poster.error ? <p className="error">{poster.error}</p> : ''}

				<form onSubmit={this.handleSubmit} className={"postCreateForm " + (poster.requestInProgress ? 'disabled' : '')}>
					<label htmlFor="sub">Sub:</label>
					<input name="sub"
						required minLength="4" maxLength="24" pattern="^[A-z0-9\-_]+$"
						type="text" value={this.state.sub} onChange={this.updateValue.bind(this, "sub")} />

					<label htmlFor="title">Title:</label>
					<input name="title"
						required minLength="4" maxLength="250"
						type="text" value={this.state.title} onChange={this.updateValue.bind(this, "title")} />


					<label htmlFor="content">Content (or link):</label>
					<textarea name="content"
						required minLength="4" maxLength="10000"
						rows="20" cols="50"
						type="text" value={this.state.content} onChange={this.updateValue.bind(this, "content")} />

					<input type="submit" value="Create" className="btn primary" />
				</form>
			</main>
		);
	}

	componentDidMount() {
		// Don't keep authentication errors if user leaves page and comes back
		this.context.poster.error = "";
	}

	handleSubmit = (e) => {
		e.preventDefault();

		// Dispatch the action
		const { sub, title, content } = this.state;
		
		// TODO: Better validation

		const is_link = content.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/) !== undefined;

		this.context.poster.makePost(sub, title, is_link, content).then((id) => {
			this.setState({...this.state, redirect: "/p/" + id})
		}).catch(() => {});
	}

	// Helper to update form values
	updateValue(name, e) {
		this.setState({...this.state, [name]: e.target.value});
	}
}