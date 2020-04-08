import React from 'react';
import { useStore } from '../context';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

export default observer(() => {
	const { auth } = useStore();

	return (
		<header>
			<Link to="/"><h1 className="title">frogger</h1></Link>

			<nav className="right">
				{auth.isLoggedIn ?
					<span className="userLinks">
						<Link to={"/u/" + auth.loggedInUser.username}>{auth.loggedInUser.username}</Link> | 
						<a onClick={(e) => {
							e.preventDefault();
							auth.doLogout()
						}} href="#">Logout</a>
					</span>
					: <span className="userLinks">
						<Link to="/login">Login</Link> |
						<Link to="/register">Register</Link>
					</span>}
			</nav>
		</header>
	);
});