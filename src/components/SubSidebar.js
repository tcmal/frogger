import React from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { useStore } from "../context";


export default observer(({ sub }) => {
	const { auth } = useStore();

	return (
		<div className="subSidebar">
			<h2>{sub.name}</h2>
			<span className="owner">Owned by <Link to={"/u/" + sub.ownerName}>/u/{sub.ownerName}</Link></span>

			{auth.isLoggedIn ? 
				<div>
					<p><Link to="/create/p">Create a post</Link></p>
					<p><a href="#" onClick={(e) => {
						e.preventDefault();

						if (sub.userIsSubscribed) {
							auth.unsubscribeFrom(sub);
						} else {
							auth.subscribeTo(sub);
						}

						sub.toggleSubscribed();
					}}>
						{sub.userIsSubscribed ? 'Unsubscribe ': 'Subscribe'}
					</a></p>
				</div>
				: ''}

			<p>{sub.description}</p>
		</div>
	);
});