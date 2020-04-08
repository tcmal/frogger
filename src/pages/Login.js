import React from 'react';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';

import { StoreContext } from '../context';
import { setDocTitle } from "../util";

import LoginForm from '../components/LoginForm';

@observer
export default class LoginPage extends React.Component {
	static contextType = StoreContext;

	render() {
		const { auth } = this.context;

		setDocTitle("Login");

		// Redirect home if user is logged in
		if (auth.isLoggedIn) {
			return <Redirect to="/" />
		}

		return (
			<main className="loginPage formPage">
				<h1 className="pageTitle">Login</h1>
				
				<LoginForm />
			</main>
		);
	}
}