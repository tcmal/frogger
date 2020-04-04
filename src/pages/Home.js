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

	if (content.posts.length == 0)
		content.loadNextPage();
	return (
		<div className="homePage">
			{content.requestInProgress ? <p className="loading">Loading...</p>
				: ''}
			{content.error ? <p className="error">{content.error}</p>
				: ''}

			<PostList contents={content.currentPage}
				hasPrev={content.hasPrev}
				onNextPage={content.loadNextPage}
				onPrevPage={content.loadPrevPage} />
		</div>
	)
});