import { hot } from 'react-hot-loader/root';
import React from 'react';

import { StoreProvider, createStore } from './context';
import { mainSwitch } from './pages';
import Header from './components/Header';
import { BrowserRouter as Router, Link } from "react-router-dom";


const App = () => (
	<div>
		<StoreProvider value={createStore()}>
			<Router>
				<Header />
				
				{mainSwitch}
			</Router>
		</StoreProvider>
	</div>
);

export default hot(App);