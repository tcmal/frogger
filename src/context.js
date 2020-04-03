//! Defines the context which propagates all our stores to our components

import React from 'react';

import TodoListModel from './models/TodoListModel';

/// Initial state for app
export const createStore = () => ({
	todos: new TodoListModel()
});

/// The React context and provider
export const StoreContext = React.createContext(null);
export const StoreProvider = StoreContext.Provider;

/// For functional components to use the store
export const useStore = () => React.useContext(StoreContext);