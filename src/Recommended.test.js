import React from "react";
import { render } from "@testing-library/react";
import Recommended from "./Recommended";
import { DataStoreContext } from "./contexts";

const entries = [
	{
		id: 1,
		shop: "7 Leaves",
		rating: 8,
	},
	{
		id: 2,
		shop: "Tea Top",
		rating: 8,
	},
	{
		id: 3,
		shop: "Pot of Cha",
		rating: 5,
	},
	{
		id: 4,
		shop: "Tea Top",
		rating: 10,
	},
	{
		id: 5,
		shop: "Pot of Cha",
		rating: 1,
	},
	{
		id: 6,
		shop: "Kung Fu Tea",
		rating: 2,
	},
];

test("recommended should be sorted by average rating", () => {
	const { getAllByTestId } = render(
		<DataStoreContext.Provider value={{ entries }}>
			<Recommended />
		</DataStoreContext.Provider>
	);

	const order = ["Tea Top", "7 Leaves", "Pot of Cha", "Kung Fu Tea"];

	const stores = getAllByTestId("recommended-shop");
	for (let i = 0; i < stores.length; ++i) {
		expect(stores[i]).toHaveTextContent(order[i]);
	}
});
