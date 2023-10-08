import React from 'react';
import {render} from '@testing-library/react';
import App from './App';
import {Provider} from "react-redux";
import {store} from "./store";
// import {store} from "./index";
import {BrowserRouter} from "react-router-dom";
import {setAuthedUser} from "./actions/authedUser";

describe("App", () => {
    it("This test case would render the App component all well", () => {
        // render(<App></App>)
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        );
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });

    it("This test case would show Login page when user has not logged in using login page which contains list of users", () => {
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        );
        const heading = component.getByTestId("login-h1");
        expect(heading).toBeInTheDocument();
    });

    it("This test case would show Dashboard page once user is logged in successfully using login page", () => {
        store.dispatch(setAuthedUser("sarahedo"));

        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        );

        const heading = component.getByTestId("h1-heading");
        expect(heading).toBeInTheDocument();
    });
});
