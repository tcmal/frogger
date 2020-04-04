import { observable } from "mobx";

export default class SubModel {
	name = ""
	description = ""
	owner_name = ""

	constructor(name) {
		this.name = name;
		this.description = "Description for " + name;
		this.owner_name = "ownerOf" + name;
	}
}
