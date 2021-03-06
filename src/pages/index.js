//! Holds routing configuration

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import Register from './Register';
import Sub from './Sub';
import CreateSub from './CreateSub';
import CreatePost from './CreatePost';
import Post from './Post';

/// The main 'Switch' that handles which page is showing
export const mainSwitch = (
	<Switch>
		<Route path="/f/all">
			<Home forceAll={true} />
		</Route>
		<Route path="/f/:name">
			<Sub />
		</Route>

		<Route path="/p/:id">
			<Post />
		</Route>

		<Route path="/create/f">
			<CreateSub />
		</Route>
		<Route path="/create/p">
			<CreatePost />
		</Route>
		
		<Route path="/register">
			<Register />
		</Route>
		<Route path="/login">
			<Login />
		</Route>

		<Route path="/" exact>
			<Home />
		</Route>

		<Route path="/">
			<h1>404</h1>
		</Route>
	</Switch>
);