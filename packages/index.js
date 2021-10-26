import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

import { createStore, applyMiddleware } from "redux";
import { Provider, useDispatch } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from './redux/root';
import thunk from "redux-thunk";

import Header from './components/Header/index';
import Landing from './components/Landing/index';
import Footer from './components/Footer/index';

import "./sass/index.css";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

const Application = () => {
    const dispatch = useDispatch();

    return (
        <React.Fragment>
            <Header />

            <Switch>
                <Route path='/' exact component={Landing} />
            </Switch>

            <Footer />
        </React.Fragment>
    );
};

ReactDOM.render(
    <Provider store = {store}>
        <BrowserRouter>
            <Application />
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);

reportWebVitals();
