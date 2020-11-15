import React from "react";
import {
	render,
	waitForElementToBeRemoved,
	fireEvent,
} from "@testing-library/react";
import EditEntry from "./EditEntry";
import { MemoryRouter, Route } from "react-router-dom";
import { createServer } from "miragejs";

let server;

beforeEach(() => {
	server = createServer({
		routes() {
			// this.namespace = "api";
			this.logging = false;

			this.get("/entries/:id", (schema, request) => {
				return {
					id: 1,
					shop: "7 Leaves",
					drink: "Assam Milk Tea with Honey Boba",
					date: "2020-05-06",
					price: 4.5,
					rating: 8,
					location: "Saratoga",
					note:
						"Refreshing and not too creamy. 7 Leaves has one of the better black milk teas.",
				};
			});
		},
	});
});

afterEach(() => {
	server.shutdown();
});

const editEntry = jest.fn();

test("rendering entry to edit", async () => {
	const { container, queryByText, getByTestId } = render(
		<MemoryRouter initialEntries={["/entries/1"]}>
			<Route path="/entries/:id" exact={true}>
				<EditEntry editEntry={editEntry} title="Edit Entry" />
			</Route>
		</MemoryRouter>
	);

	expect(container).toHaveTextContent("Loading...");

	await waitForElementToBeRemoved(() => {
		return queryByText("Loading...");
	});

	expect(getByTestId("shop")).toHaveValue("7 Leaves");
	expect(getByTestId("drink")).toHaveValue("Assam Milk Tea with Honey Boba");
	expect(getByTestId("date")).toHaveValue("2020-05-06");
	expect(getByTestId("price")).toHaveValue(4.5);
	expect(getByTestId("location")).toHaveValue("Saratoga");
	expect(getByTestId("rating")).toHaveValue("8");
	expect(getByTestId("note")).toHaveValue(
		"Refreshing and not too creamy. 7 Leaves has one of the better black milk teas."
	);
});

test("editing an entry", async () => {
	const { container, queryByText, getByTestId } = render(
		<MemoryRouter initialEntries={["/entries/1"]}>
			<Route path="/entries/:id" exact={true}>
				<EditEntry editEntry={editEntry} title="Edit Entry" />
			</Route>
		</MemoryRouter>
	);

	expect(container).toHaveTextContent("Loading...");

	await waitForElementToBeRemoved(() => {
		return queryByText("Loading...");
	});

	fireEvent.change(getByTestId("date"), {
		target: {
			value: "2020-11-13",
		},
	});

	fireEvent.change(getByTestId("price"), {
		target: {
			value: 5,
		},
	});

	fireEvent.click(getByTestId("submit-button"));

	expect(editEntry).toHaveBeenCalledWith(
		{
			id: 1,
			shop: "7 Leaves",
			drink: "Assam Milk Tea with Honey Boba",
			date: "2020-05-06",
			price: 4.5,
			rating: 8,
			location: "Saratoga",
			note:
				"Refreshing and not too creamy. 7 Leaves has one of the better black milk teas.",
		},
		"7 Leaves",
		"Assam Milk Tea with Honey Boba",
		"2020-11-13",
		5,
		8,
		"Saratoga",
		"Refreshing and not too creamy. 7 Leaves has one of the better black milk teas."
	);
});

test("editing an entry creates notification", async () => {
	const { container, queryByText, getByTestId, getByRole } = render(
		<MemoryRouter initialEntries={["/entries/1"]}>
			<Route path="/entries/:id" exact={true}>
				<EditEntry editEntry={editEntry} title="Edit Entry" />
			</Route>
		</MemoryRouter>
	);

	expect(container).toHaveTextContent("Loading...");

	await waitForElementToBeRemoved(() => {
		return queryByText("Loading...");
	});

	fireEvent.click(getByTestId("submit-button"));

	const toast = getByRole("alert");
	expect(toast).toBeInTheDocument();
});
