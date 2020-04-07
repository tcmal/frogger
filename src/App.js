import { hot } from 'react-hot-loader';
import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";

import { StoreProvider } from './context';
import { mainSwitch } from './pages';
import Header from './components/Header';

import "./css/index.css";

const App = ({ store }) => (
	<div>
		<StoreProvider value={store}>
			<Router>
				<Header />
				
				{mainSwitch}
			</Router>
		</StoreProvider>
	</div>
);

export default hot(module)(App);