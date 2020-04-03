import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import DevTools from "mobx-react-devtools";

import TodoList from "./components/TodoList";
import TodoListModel from "./models/TodoListModel";
import TodoModel from "./models/TodoModel";

const store = new TodoListModel();

render(
	<div>
		<DevTools />
		<Router>
			<ul>
				<li><Link to="/">Home</Link></li>
				<li><Link to="/second">Second</Link></li>
			</ul>

			<Switch>
				<Route path="/second">
					<h1>It Works!</h1>
				</Route>

				<Route path="/">
					<TodoList store={store} />
				</Route>
			</Switch>
		</Router>
	</div>,
	document.getElementById("root")
);

store.addTodo("Get Coffee");
store.addTodo("Write simpler code");
store.todos[0].finished = true;

setTimeout(() => {
	store.addTodo("Get a cookie as well");
}, 2000);