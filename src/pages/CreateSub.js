import React from 'react';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';

import { StoreContext } from '../context';
import { setDocTitle } from "../util";

@observer
export default class CreateSubPage extends React.Component {
	static contextType = StoreContext;

	constructor(props) {
		super(props);

		// Setup initial state
		this.state = {
			name: "",
			description: "",
			redirect: ""
		};
	}

	render() {
		const { auth, subMod } = this.context;

		// Redirect home if user is logged in
		if (!auth.isLoggedIn) {
			return <Redirect to="/login" />
		}

		if (this.state.redirect) {
			return <Redirect to={this.state.redirect} />
		}

		return (
			<main className="registerPage formPage formContainer">
				<h1 className="pageTitle">Create a sub</h1>
				{subMod.error ? <p className="error">{subMod.error}</p> : ''}

				<form onSubmit={this.handleSubmit} className={"subCreateForm " + (subMod.requestInProgress ? 'disabled' : '')}>
					<label htmlFor="name">Name:</label>
					<input name="name"
						required minLength="4" maxLength="24" pattern="^[A-z0-9\-_]+$"
						type="text" value={this.state.name} onChange={this.updateValue.bind(this, "name")} />

					<label htmlFor="description">Description:</label>
					<textarea name="description"
						required minLength="10" maxLength="250"
						value={this.state.description} onChange={this.updateValue.bind(this, "description")} />

					<input type="submit" value="Create" className="btn primary" />
				</form>
			</main>
		);
	}

	componentDidMount() {
		// Don't keep authentication errors if user leaves page and comes back
		this.context.subMod.error = "";

		setDocTitle("Create Sub");
	}

	handleSubmit = (e) => {
		e.preventDefault();

		// Dispatch the action
		const { name, description } = this.state;

		this.context.subMod.createSub(name, description).then(() => {
			this.setState({...this.state, redirect: "/f/" + name})
		}).catch(() => {});
	}

	// Helper to update form values
	updateValue(name, e) {
		this.setState({...this.state, [name]: e.target.value});
	}
}