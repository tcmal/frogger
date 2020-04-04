import React from 'react';
import { useStore } from '../context';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

export default observer(() => {
	const { auth } = useStore();

	return (
		<header>
			<h1 className="title">frogger</h1>

			<div className="right">
					<span className="username">
					{auth.isLoggedIn ?
						<Link to={"/u/" + auth.loggedInUser.username}>{auth.loggedInUser.username}</Link>
						: <Link to="/login">Login</Link>}
					</span>
			</div>
		</header>
	)
});