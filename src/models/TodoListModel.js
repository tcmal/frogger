import { observable, computed, action } from "mobx";

import TodoModel from "./TodoModel";

export default class TodoListModel {
	@observable todos = [
		new TodoModel("Thing 1"),
		new TodoModel("Thing 2"),
		new TodoModel("Thing 3")
	];

	@computed
	get unfinishedTodoCount() {
		return this.todos.filter(todo => !todo.finished).length;
	}

	@action
	addTodo(title) {
		this.todos.push(new TodoModel(title));
	}
}
