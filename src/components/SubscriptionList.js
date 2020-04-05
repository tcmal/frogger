import React from "react";
import { observer } from "mobx-react";
import { PaginationWrapper } from "./Utils";

export const SubscriptionListItem = ({ item, onUnsubscribe }) => (
	<div className="subListItem">
		<button className="remove" onClick={() => onUnsubscribe(item.name)}>-</button>
		<p className="name">{item.name}</p>
	</div>
);

export default observer(({ subscriptions, onUnsubscribe }) => {
	subscriptions.ensureNotEmpty();

	return (
		<div className="subListContainer">
			<h3>Your subscriptions</h3>
			<PaginationWrapper pagable={subscriptions} className="subList">
				{subscriptions.currentPage.map(x => 
					<SubscriptionListItem onUnsubscribe={onUnsubscribe} key={x.name} item={x} />
				)}
			</PaginationWrapper>
		</div>
	);
});