import {fireEvent, render} from "@testing-library/react";
import {Provider} from "react-redux";
import {store} from "../store";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import NewPoll from "./NewPoll";

describe("NewPoll", () => {
    it("This test case would render the New Poll component all well", () => {
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <NewPoll/>
                </BrowserRouter>
            </Provider>
        );
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });

    it("This test case would check if New Poll form has all the required elements", () => {
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <NewPoll/>
                </BrowserRouter>
            </Provider>
        );

        const firstOptionLabelElement = component.getByTestId("Option1Label");
        const firstOptionInputElement = component.getByTestId("Option1");
        const secondOptionLabelElement = component.getByTestId("Option2Label");
        const secondOptionInputElement = component.getByTestId("Option2");
        const submitButtonElement = component.getByTestId("submit-poll");

        expect(firstOptionLabelElement.textContent).toBe("First Option");
        expect(secondOptionLabelElement.textContent).toBe("Second Option");
        expect(submitButtonElement.textContent).toBe("Submit");

        fireEvent.change(firstOptionInputElement, {target: {value: 'go to goa'}});
        fireEvent.change(secondOptionInputElement, {target: {value: 'go to hills'}});
        expect(firstOptionInputElement.value).toBe("go to goa");
        expect(secondOptionInputElement.value).toBe("go to hills");
    });
});
