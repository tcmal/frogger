//! Viewing posts on a sub
import React from 'react';
import { observer } from 'mobx-react';
import { useParams, Link } from 'react-router-dom';

import { useStore } from '../context';
import PostList from '../components/PostList';

export default observer(({ forceAll }) => {

	const { sub } = useStore();
	const { name } = useParams();

	// Make sure we load the right sub
	if (!sub.loadedSub || sub.loadedSub.name != name)
		sub.setLoadedSub(name);

	return (
		<div className="subPage">
			<section className="content">
				{sub.requestInProgress ? <p className="loading">Loading...</p>
					: ''}
				{sub.error ? <p className="error">{sub.error}</p>
					: ''}

				<PostList contents={sub.currentPage}
					hasPrev={sub.hasPrev}
					onNextPage={sub.loadNextPage}
					onPrevPage={sub.loadPrevPage} />
			</section>
			<aside className="sidebar">
				<h2>{sub.loadedSub.name}</h2>
				<span className="owner">Owned by <Link to={"/u/" + sub.loadedSub.owner_name}>/u/{sub.loadedSub.owner_name}</Link></span>

				<p>{sub.loadedSub.description}</p>
			</aside>
		</div>
	)
});