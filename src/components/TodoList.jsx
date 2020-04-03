import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

import { StoreContext } from '../context';

import Todo from "./Todo";

@observer
class TodoList extends React.Component {
	static contextType = StoreContext;

	@observable newTodoTitle = "";

	render() {
		const { todos } = this.context;

		return (
			<div>
				<form onSubmit={this.handleFormSubmit}>
					New Todo:
					<input
						type="text"
						value={this.newTodoTitle}
						onChange={this.handleInputChange}
					/>
					<button type="submit">Add</button>
				</form>
				<hr />
				<ul>
					{todos.todos.map(todo => (
						<Todo todo={todo} key={todo.id} />
					))}
				</ul>
				Tasks left: {todos.unfinishedTodoCount}
			</div>
		);
	}

	@action
	handleInputChange = e => {
		this.newTodoTitle = e.target.value;
	};

	@action
	handleFormSubmit = e => {
		const { todos } = this.context;

		todos.addTodo(this.newTodoTitle);

		this.newTodoTitle = "";
		e.preventDefault();
	};
}

export default TodoList;
