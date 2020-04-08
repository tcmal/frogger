//! Viewing posts on a sub
import React from 'react';
import { observer } from 'mobx-react';
import { useParams, Link } from 'react-router-dom';

import { setDocTitle } from "../util";
import { useStore } from '../context';
import PostList from '../components/PostList';
import SubSidebar from '../components/SubSidebar';

import { PaginationWrapper, LoadableWrapper } from '../components/Utils';

export default observer(({ forceAll }) => {

	const { sub } = useStore();
	const { name } = useParams();

	// Make sure we load the right sub
	sub.setLoadedSub(name);

	if (sub.sub) {
		setDocTitle(sub.sub.name);
	}

	return (
		<LoadableWrapper loadable={sub}>
			<div className="subPage">
				<section className="content">
					<PostList postList={sub.posts} />
				</section>
				<aside className="sidebar">
					<SubSidebar sub={sub.sub} />
				</aside>
			</div>
		</LoadableWrapper>
	)
});