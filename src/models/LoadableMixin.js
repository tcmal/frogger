//! Mixin representing async loading in a store

import { observable, computed, action } from "mobx";

export default class LoadableMixin {
	@observable
	requestInProgress = false;

	@observable
	error = "";
}