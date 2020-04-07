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
	const useAll = forceAll || !store.auth.isLoggedIn;
	const content = useAll ? store.all : store.home;
	const isLoggedIn = store.auth.isLoggedIn;

	content.ensureNotEmpty();

	return (
		<div className="homePage">
			<div className="content">
				<PostList postList={content} />
			</div>
			<div className="sidebar">
				{useAll ? 
					<div>
						<h2>/f/all</h2>
						<p>You're viewing all posts.</p>

						{isLoggedIn ? <Link to="/">View your feed</Link> : ''}
					</div>
					:
					<div>
						<h2>Your feed</h2>
						<p>You're viewing your feed.</p>
						
						<Link to="/f/all">View all posts</Link>

						<SubscriptionList subscriptions={store.auth.loggedInUser.subscriptions}
							onUnsubscribe={store.auth.unsubscribeFrom} />
					</div>}
				{!isLoggedIn ? 
					<div>
						<h2>Sign in</h2>

						<LoginForm />
						<Link to="/register">or register</Link>
					</div> : 
					<div>
						<p><Link to="/create/p">Create a post</Link></p>
						<p><Link to="/create/f">Create a sub</Link></p>
					</div>}
			</div>
		</div>
	)
});