import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Entries from "./Entries";
import { MemoryRouter, Route } from "react-router-dom";
import { DataStoreContext } from "./contexts";

const entries = [
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
	{
		id: 2,
		shop: "Pot of Cha",
		drink: "Red Ruby Milk Tea with Boba",
		price: 4.04,
		date: "2020-03-12",
		rating: 10,
		location: "Los Angeles",
		note:
			"Good tea flavor, boba is chewy and has nice flavor too. Strong caffeine",
	},
];

const deleteEntry = jest.fn();

test("rendering entries", () => {
	const { getAllByTestId } = render(
		<DataStoreContext.Provider value={{ entries }}>
			<MemoryRouter initialEntries={["/home"]}>
				<Route path="/home" exact={true}>
					<Entries deleteEntry={deleteEntry} />
				</Route>
			</MemoryRouter>
		</DataStoreContext.Provider>
	);

	expect(getAllByTestId("entry").length).toBe(2);
});

test("checking entries' content", () => {
	const { getAllByTestId } = render(
		<DataStoreContext.Provider value={{ entries }}>
			<MemoryRouter initialEntries={["/home"]}>
				<Route path="/home" exact={true}>
					<Entries deleteEntry={deleteEntry} />
				</Route>
			</MemoryRouter>
		</DataStoreContext.Provider>
	);

	const entriesList = getAllByTestId("entry");

	for (let i = 0; i < entriesList.length; ++i) {
		expect(entriesList[i].childNodes[1].textContent).toEqual(entries[i].shop);
		expect(entriesList[i].childNodes[2].textContent).toEqual(entries[i].drink);
		expect(Number(entriesList[i].childNodes[3].textContent)).toEqual(
			entries[i].price
		);
		expect(entriesList[i].childNodes[4].textContent).toEqual(entries[i].date);
		expect(Number(entriesList[i].childNodes[5].textContent)).toEqual(
			entries[i].rating
		);
		expect(entriesList[i].childNodes[6].textContent).toEqual(
			entries[i].location
		);
		expect(entriesList[i].childNodes[7].textContent).toEqual(entries[i].note);
	}
});
