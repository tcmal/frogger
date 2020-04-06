//! Sets up context and routing
import React from "react";
import { render } from "react-dom";
import { createStore } from "./context";

import App from './App';

const store = createStore();

render(<App store={store} />,
	document.getElementById("root")
);