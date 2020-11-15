import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CreateEntry from "./CreateEntry";
import { MemoryRouter, Route } from "react-router-dom";

const createEntry = jest.fn();

test("adding an entry", () => {
	const { getByTestId } = render(
		<MemoryRouter initialEntries={["/new"]}>
			<Route path="/new" exact={true}>
				<CreateEntry createEntry={createEntry} title="Add New Entry" />
			</Route>
		</MemoryRouter>
	);

	fireEvent.change(getByTestId("shop"), {
		target: {
			value: "Shop",
		},
	});

	fireEvent.change(getByTestId("drink"), {
		target: {
			value: "Drink",
		},
	});

	fireEvent.click(getByTestId("submit-button"));

	expect(createEntry).toHaveBeenCalledWith("Shop", "Drink", "", "", "", "", "");
});

test("creating an entry without required store field triggers custom form validation", async () => {
	const { getByTestId } = render(
		<MemoryRouter initialEntries={["/new"]}>
			<Route path="/new" exact={true}>
				<CreateEntry createEntry={createEntry} title="Add New Entry" />
			</Route>
		</MemoryRouter>
	);

	fireEvent.click(getByTestId("submit-button"));

	expect(getByTestId("shop").className).toContain("is-invalid");
});

test("creating an entry without required drink field triggers custom form validation", async () => {
	const { getByTestId } = render(
		<MemoryRouter initialEntries={["/new"]}>
			<Route path="/new" exact={true}>
				<CreateEntry createEntry={createEntry} title="Add New Entry" />
			</Route>
		</MemoryRouter>
	);

	fireEvent.change(getByTestId("shop"), {
		target: {
			value: "Shop",
		},
	});

	fireEvent.click(getByTestId("submit-button"));

	expect(getByTestId("drink").className).toContain("is-invalid");
});
