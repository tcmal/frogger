import { hot } from 'react-hot-loader';
import React from 'react';

import "./css/index.css";

import { StoreProvider } from './context';
import { mainSwitch } from './pages';
import Header from './components/Header';
import { BrowserRouter as Router, Link } from "react-router-dom";


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