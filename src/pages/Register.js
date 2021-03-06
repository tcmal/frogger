import React from 'react';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';

import { setDocTitle } from "../util";
import { StoreContext } from '../context';

@observer
export default class RegisterPage extends React.Component {
	static contextType = StoreContext;

	constructor(props) {
		super(props);

		// Setup initial state
		this.state = {
			username: "",
			email: "",
			password: "",
			confirm: ""
		};
	}

	render() {
		const { auth } = this.context;

		// Redirect home if user is logged in
		if (auth.isLoggedIn) {
			return <Redirect to="/" />
		}

		setDocTitle("Register");

		return (
			<main className="registerPage formPage formContainer">
				<h1 className="pageTitle">Register</h1>
				{auth.error ? <p className="error">{auth.error}</p> : ''}

				<form onSubmit={this.handleSubmit} className={"registerForm " + (auth.requestInProgress ? 'disabled' : '')}>
					<label htmlFor="username">Username:</label>
					<input id="username" type="text"
						required minLength="4" maxLength="24"
						value={this.state.username} onChange={this.updateValue.bind(this, "username")} />

					<label htmlFor="email">Email:</label>
					<input id="email" type="email"
						value={this.state.email} onChange={this.updateValue.bind(this, "email")} />

					<label htmlFor="password">Password:</label>
					<input id="password" type="password"
						required minLength="8" maxLength="32"
						value={this.state.password} onChange={this.updateValue.bind(this, "password")} />

					<label htmlFor="confirm">Confirm Password:</label>
					<input id="confirm" type="password"
						required minLength="8" maxLength="32"
						value={this.state.confirm} onChange={this.updateValue.bind(this, "confirm")} />

					<input type="submit" value="Register" className="btn primary" />
				</form>
			</main>
		);
	}

	componentDidMount() {
		// Don't keep authentication errors if user leaves page and comes back
		this.context.auth.error = "";
	}

	handleSubmit = (e) => {
		e.preventDefault();

		// Dispatch the action
		const { username, password, confirm, email } = this.state;
		if (password !== confirm) {
			// TODO: Use some other way to show error?
			this.context.auth.error = "Password and Confirm Password don't match.";

			return;
		}

		this.context.auth.attemptRegister(username, password, email);
	}

	// Helper to update form values
	updateValue(name, e) {
		this.setState({...this.state, [name]: e.target.value});
	}
}