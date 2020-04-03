//! Sets up context and routing

import React from "react";
import { render } from "react-dom";

import { BrowserRouter as Router, Link } from "react-router-dom";

import { StoreProvider, createStore } from './context';
import { mainSwitch } from './pages';

render(
	<div>
		<StoreProvider value={createStore()}>
			<Router>
				{mainSwitch}
			</Router>
		</StoreProvider>
	</div>,
	document.getElementById("root")
);