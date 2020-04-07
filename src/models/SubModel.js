//! Data for a sub

import { observable, action } from "mobx";

export default class SubModel {
	name = ""
	description = ""
	ownerName = ""

	@observable
	userIsSubscribed = ""

	constructor({ name, description, ownerName, userIsSubscribed=false }) {
		this.name = name;
		this.description = description;
		this.ownerName = ownerName;
		this.userIsSubscribed = userIsSubscribed;
	}

	@action toggleSubscribed() {
		this.userIsSubscribed = !this.userIsSubscribed;
	}
}
