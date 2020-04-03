//! Holds routing configuration

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';

/// The main 'Switch' that handles which page is showing
export const mainSwitch = (
	<Switch>
		<Route path="/">
			<Home />
		</Route>
	</Switch>
);