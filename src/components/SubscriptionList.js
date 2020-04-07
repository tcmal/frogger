import React from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

import { PaginationWrapper } from "./Utils";
import { useStore } from "../context";


export const SubscriptionListItem = ({ isOwner, item, onUnsubscribe }) => (
	<div className="subListItem">
		<div className="remove">
			{isOwner ? '' : 
				<button onClick={() => onUnsubscribe(item.name)}>-</button> }
		</div>
		<p className="name"><Link to={"/f/" + item.name}>{item.name}</Link></p>
	</div>
);

export default observer(({ subscriptions, onUnsubscribe }) => {
	subscriptions.ensureNotEmpty();
	const { auth } = useStore();

	return (
		<div className="subListContainer">
			<h3>Your subscriptions</h3>
			<PaginationWrapper pagable={subscriptions} className="subList">
				{subscriptions.currentPage.map(x => 
					<SubscriptionListItem isOwner={x.ownerName == auth.loggedInUser.username}
						onUnsubscribe={onUnsubscribe} key={x.name} item={x} />
				)}
			</PaginationWrapper>
		</div>
	);
});