import React from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

import { PaginationWrapper } from "./Utils";
import { useStore } from "../context";


export const SubscriptionListItem = function SubscriptionListItem({ isOwner, item, onUnsubscribe }) {
	const { auth } = useStore();

	return (
		<div className="subListItem">
			{item.ownerName == auth.loggedInUser.username ? <div className="padding"></div> : 
				<button className="remove" onClick={() => auth.unsubscribeFrom(item)}>-</button>}
			<p className="name"><Link to={"/f/" + item.name}>{item.name}</Link></p>
		</div>
	);
};

export default observer(function SubscriptionList({ subscriptions, onUnsubscribe }) {
	subscriptions.ensureNotEmpty();
	return (
		<div className="subListContainer">
			<h3>Your subscriptions</h3>
			<PaginationWrapper pagable={subscriptions} className="subList">
				{subscriptions.currentPage.map(x => 
					<SubscriptionListItem key={x.name} item={x} />
				)}
			</PaginationWrapper>
		</div>
	);
});