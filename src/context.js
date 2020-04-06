//! Defines the context which propagates all our stores to our components

import React from 'react';

import HomePageModel from './models/HomePageModel';
import AllPageModel from './models/AllPageModel';
import AuthenticationModel from './models/AuthenticationModel';
import SubPageModel from './models/SubPageModel';
import SubModModel from './models/SubModModel';
import PostDetailModel from './models/PostDetailModel';
import PosterModel from './models/PosterModel';

/// Initial state for app
export const createStore = () => ({
	home: new HomePageModel(),
	all: new AllPageModel(),
	auth: new AuthenticationModel(),
	sub: new SubPageModel(),
	subMod: new SubModModel(),
	post: new PostDetailModel(),
	poster: new PosterModel()
});

/// The React context and provider
export const StoreContext = React.createContext(null);
export const StoreProvider = StoreContext.Provider;

/// For functional components to use the store
export const useStore = () => React.useContext(StoreContext);