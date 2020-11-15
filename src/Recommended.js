import React, { useState, useEffect, useContext } from "react";
import { DataStoreContext } from "./contexts";
import sortBy from "lodash.sortby";

export default function Recommended() {
	const { entries } = useContext(DataStoreContext);
	const [recommended, setRecommended] = useState([]);

	useEffect(() => {
		var storeRatings = {};
		entries.forEach((entry) => {
			storeRatings[entry.shop] = storeRatings[entry.shop] || {
				count: 0,
				total: 0,
				avg: 0,
				id: entry.id,
				shop: entry.shop,
			};
			storeRatings[entry.shop].count++;
			storeRatings[entry.shop].total += entry.rating;
			storeRatings[entry.shop].avg =
				storeRatings[entry.shop].total / storeRatings[entry.shop].count;
		});
		let sortedRecs = sortBy(storeRatings, "avg");
		sortedRecs = sortedRecs.reverse();
		setRecommended(sortedRecs);
	}, [entries]);

	return (
		<div id="recommended">
			<h4>Your Recommended Stores</h4>
			<table className="table table-hover table-responsive">
				<thead></thead>
				<tbody>
					{recommended.map((entry) => {
						return (
							<tr key={entry.id}>
								<td data-testid="recommended-shop">{entry.shop}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
