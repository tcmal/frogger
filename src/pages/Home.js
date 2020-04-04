//! The homepage
import React from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../context';

import PostList from '../components/PostList';

export default observer(({ forceAll }) => {

	const store = useStore();

	// Always use all store if we're on /all
	// Otherwise, show user home if we can
	const content = !forceAll && store.auth.isLoggedIn ? store.home : store.all;

	content.ensureNotEmpty();

	return (
		<div className="homePage">
			<PostList postList={content} />
		</div>
	)
});