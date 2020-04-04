//! Sets up context and routing

import "./css/index.css";
import React from "react";
import { render } from "react-dom";

import { BrowserRouter as Router, Link } from "react-router-dom";

import { StoreProvider, createStore } from './context';
import { mainSwitch } from './pages';

import Header from './components/Header';

render(
	<div>
		<StoreProvider value={createStore()}>
			<Router>
				<Header />
				
				{mainSwitch}
			</Router>
		</StoreProvider>
	</div>,
	document.getElementById("root")
);