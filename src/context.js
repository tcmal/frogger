//! Defines the context which propagates all our stores to our components

import React from 'react';

import HomePageModel from './models/HomePageModel';
import AuthenticationModel from './models/AuthenticationModel';
import SubPostsModel from './models/SubPostsModel';
import PostDetailModel from './models/PostDetailModel';

/// Initial state for app
export const createStore = () => ({
	home: new HomePageModel(),
	all: new HomePageModel(), // TODO
	auth: new AuthenticationModel(),
	sub: new SubPostsModel(),
	post: new PostDetailModel()
});

/// The React context and provider
export const StoreContext = React.createContext(null);
export const StoreProvider = StoreContext.Provider;

/// For functional components to use the store
export const useStore = () => React.useContext(StoreContext);