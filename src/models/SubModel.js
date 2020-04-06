//! Data for a sub

import { observable } from "mobx";

export default class SubModel {
	name = ""
	description = ""
	ownerName = ""

	constructor({ name, description, ownerName }) {
		this.name = name;
		this.description = description;
		this.ownerName = ownerName;
	}
}
