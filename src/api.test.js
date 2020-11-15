import { createServer, Response } from "miragejs";
import { fetchEntries, fetchEntry, destroyEntry, saveEntry } from "./api";

let server;

// runs before each test
beforeEach(() => {
	server = createServer({
		routes() {
			// this.namespace = "api"; // prefixes all route paths
			this.logging = false; // turns off miragejs's console logs

			this.get("/entries", () => {
				return [
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
			});

			this.get("/entries/:id", (schema, request) => {
				if (request.params.id === "2") {
					return [
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
				}

				// status code, response headers, response payload
				return new Response(404, {}, null);
			});

			this.post("/entries", () => {
				return [
					{
						id: 3,
						shop: "Tea Top",
						drink: "Passion Fruit Medley",
						date: "2020-11-07",
						price: 5.25,
						rating: 9,
						location: "Cupertino",
						note:
							"Comes with boba and lychee jelly. Made with syrup but is super refreshing and has good flavor.",
					},
				];
			});

			this.put("/entries/2", () => {
				return [
					{
						id: 2,
						shop: "YiFang",
						drink: "Fruit Tea",
						date: "2020-11-14",
						price: 5,
						rating: 7,
						location: "Cupertino",
						note:
							"Tea flavor is obvious and fruit flavor is super refreshing. Drink is kind of expensive..",
					},
				];
			});
		},
	});
});

afterEach(() => {
	server.shutdown();
});

test("fetchEntries()", () => {
	return fetchEntries().then((entries) => {
		expect(entries).toEqual([
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
		]);
	});
});

test("fetchEntry() with an entry that exists", () => {
	return fetchEntry(2).then((entry) => {
		expect(entry).toEqual([
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
		]);
	});
});

test("fetchEntry() with an entry that doesn't exist", () => {
	return fetchEntry(99).then(
		() => {},
		(error) => {
			expect(error).toBe(
				"There was an error requesting the entry with an id of 99"
			);
		}
	);
});

test("saveEntry() - creating new entry", () => {
	return saveEntry({
		shop: "Tea Top",
		drink: "Passion Fruit Medley",
		date: "2020-11-07",
		price: 5.25,
		rating: 9,
		location: "Cupertino",
		note:
			"Comes with boba and lychee jelly. Made with syrup but is super refreshing and has good flavor.",
	}).then((entry) => {
		expect(entry).toEqual([
			{
				id: 3,
				shop: "Tea Top",
				drink: "Passion Fruit Medley",
				date: "2020-11-07",
				price: 5.25,
				rating: 9,
				location: "Cupertino",
				note:
					"Comes with boba and lychee jelly. Made with syrup but is super refreshing and has good flavor.",
			},
		]);
	});
});

test("saveEntry() - editing existing entry", () => {
	return saveEntry({
		id: 2,
		shop: "YiFang",
		drink: "Fruit Tea",
		date: "2020-11-14",
		price: 5,
		rating: 7,
		location: "Cupertino",
		note:
			"Tea flavor is obvious and fruit flavor is super refreshing. Drink is kind of expensive..",
	}).then((entry) => {
		expect(entry).toEqual([
			{
				id: 2,
				shop: "YiFang",
				drink: "Fruit Tea",
				date: "2020-11-14",
				price: 5,
				rating: 7,
				location: "Cupertino",
				note:
					"Tea flavor is obvious and fruit flavor is super refreshing. Drink is kind of expensive..",
			},
		]);
	});
});
