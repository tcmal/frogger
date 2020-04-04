//! Defines the context which propagates all our stores to our components

import React from 'react';

import HomePageModel from './models/HomePageModel';
import AuthenticationModel from './models/AuthenticationModel';

/// Initial state for app
export const createStore = () => ({
	homePage: new HomePageModel(),
	auth: new AuthenticationModel()
});

/// The React context and provider
export const StoreContext = React.createContext(null);
export const StoreProvider = StoreContext.Provider;

/// For functional components to use the store
export const useStore = () => React.useContext(StoreContext);