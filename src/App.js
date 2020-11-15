import React, { useEffect, useReducer } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { fetchEntries, destroyEntry, saveEntry } from "./api";
import Navbar from "./Navbar";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import CreateEntry from "./CreateEntry";
import EditEntry from "./EditEntry";
import PageNotFound from "./PageNotFound";
import { DataStoreContext } from "./contexts";
import { entriesReducer } from "./reducers";

function App() {
	const [entries, dispatch] = useReducer(entriesReducer, []);
	// const [entries, setEntries] = useState([]);
	useEffect(() => {
		fetchEntries().then((entries) => {
			dispatch({
				// action variable in EntrysReducer
				type: "ENTRIES_LOADED",
				payload: entries,
			});
		});
	}, []);

	function deleteEntry(deletedEntry) {
		destroyEntry(deletedEntry.id).then(() => {
			dispatch({
				type: "ENTRY_DELETED",
				payload: {
					id: deletedEntry.id,
				},
			});
		});
	}

	function editEntry(
		editedEntry,
		shop,
		drink,
		date,
		price,
		rating,
		location,
		note
	) {
		saveEntry({
			id: editedEntry.id,
			shop,
			drink,
			date,
			price,
			rating,
			location,
			note,
		}).then((editedEntry) => {
			dispatch({
				type: "ENTRY_EDITED",
				payload: {
					editedEntry,
				},
			});
		});
	}

	function createEntry(shop, drink, date, price, rating, location, note) {
		saveEntry({
			shop,
			drink,
			date,
			price,
			rating,
			location,
			note,
		}).then((newEntry) => {
			dispatch({
				type: "ENTRY_CREATED",
				payload: {
					newEntry,
				},
			});
		});
	}

	return (
		<DataStoreContext.Provider value={{ entries }}>
			<Router>
				<div className="body">
					<div className="wrapper">
						<Navbar />
						<Switch>
							<Route path="/" exact={true}>
								<AboutPage title="Boba Log" />
							</Route>
							<Route path="/home" exact={true}>
								<HomePage deleteEntry={deleteEntry} title="All Entries" />
							</Route>
							<Route path="/entries/:id" exact={true}>
								<EditEntry editEntry={editEntry} title="Edit Entry" />
							</Route>
							<Route path="/new" exact={true}>
								<CreateEntry createEntry={createEntry} title="Add New Entry" />
							</Route>
							<Route path="*">
								<PageNotFound title="Invalid URL" />
							</Route>
						</Switch>
					</div>
				</div>
			</Router>
		</DataStoreContext.Provider>
	);
}

export default App;
