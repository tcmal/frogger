import React from 'react';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';

import { StoreContext } from '../context';

@observer
export default class LoginPage extends React.Component {
	static contextType = StoreContext;

	constructor(props) {
		super(props);

		// Setup initial state
		this.state = {
			username: "",
			password: ""
		};
	}

	render() {
		const { auth } = this.context;

		// Redirect home if user is logged in
		if (auth.isLoggedIn) {
			return <Redirect to="/" />
		}

		return (
			<main className="loginPage formPage">
				<h1 className="pageTitle">Login</h1>

				<form onSubmit={this.handleSubmit} className={"loginForm " + (auth.requestInProgress ? 'disabled' : '')}>
					<label htmlFor="username">Username:</label>
					<input name="username" required type="text" value={this.state.username} onChange={this.updateValue.bind(this, "username")} />

					<label htmlFor="password">Password:</label>
					<input name="password" required type="password" value={this.state.password} onChange={this.updateValue.bind(this, "password")} />

					<input type="submit" value="Login" className="btn primary" />
				</form>
				
				{auth.error ? <p className="error">{auth.error}</p> : ''}
			</main>
		);
	}

	componentDidMount() {
		// Don't keep authentication errors if user leaves page and comes back
		// this.context.auth.error = "";
	}

	handleSubmit = (e) => {
		e.preventDefault();

		// Dispatch the action
		const { username, password } = this.state;
		this.context.auth.attemptLogin(username, password);
	}

	// Helper to update form values
	updateValue(name, e) {
		this.setState({...this.state, [name]: e.target.value});
	}
}