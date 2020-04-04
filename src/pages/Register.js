import React from 'react';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';

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

		return (
			<main className="registerPage formPage">
				<h1 className="pageTitle">Register</h1>
				{auth.error ? <p className="error">{auth.error}</p> : ''}

				<form onSubmit={this.handleSubmit} className={"registerForm " + (auth.requestInProgress ? 'disabled' : '')}>
					<label htmlFor="username">Username:</label>
					<input name="username" required type="text" value={this.state.username} onChange={this.updateValue.bind(this, "username")} />

					<label htmlFor="email">Email:</label>
					<input name="email" type="email" value={this.state.email} onChange={this.updateValue.bind(this, "email")} />

					<label htmlFor="password">Password:</label>
					<input name="password" required type="password" value={this.state.password} onChange={this.updateValue.bind(this, "password")} />

					<label htmlFor="confirm">Confirm Password:</label>
					<input name="confirm" required type="password" value={this.state.confirm} onChange={this.updateValue.bind(this, "confirm")} />

					<input type="submit" value="Login" />
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