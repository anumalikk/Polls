import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createStore } from "redux";
import {BrowserRouter} from "react-router-dom";
import { Provider } from "react-redux";
import reducer from "./reducers";
import middleware from "./middleware";

export const store = createStore(reducer, middleware);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
  
);


