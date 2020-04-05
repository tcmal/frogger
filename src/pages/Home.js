//! The homepage
import React from 'react';
import { Link } from "react-router-dom";
import { observer } from 'mobx-react';
import { useStore } from '../context';

import PostList from '../components/PostList';
import SubscriptionList from '../components/SubscriptionList';
import LoginForm from '../components/LoginForm';

export default observer(({ forceAll }) => {

	const store = useStore();

	// Always use all store if we're on /all
	// Otherwise, show user home if we can
	const content = !forceAll && store.auth.isLoggedIn ? store.home : store.all;
	const isLoggedIn = store.auth.isLoggedIn;

	content.ensureNotEmpty();

	return (
		<div className="homePage">
			<div className="content">
				<PostList postList={content} />
			</div>
			{isLoggedIn ? 
				<div className="sidebar">
					<p><Link to="/create/p">Create a post</Link></p>
					<p><Link to="/create/f">Create a sub</Link></p>
					<SubscriptionList subscriptions={store.auth.loggedInUser.subscriptions}
						onUnsubscribe={store.auth.unsubscribeFrom} />
				</div> :
				<div className="sidebar">
					<h2>Sign in</h2>

					<LoginForm />
					<Link to="/register">or register</Link>
				</div>
			}
		</div>
	)
});