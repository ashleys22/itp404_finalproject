import React, { useEffect } from "react";
import EntryForm from "./EntryForm";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
export default function CreateEntry({ createEntry, title }) {
	const history = useHistory();

	useEffect(() => {
		document.title = title;
	}, [title]);

	function handleSubmit(shop, drink, date, price, rating, location, note) {
		createEntry(shop, drink, date, price, rating, location, note);
		history.push("/home");
		toast.success(`"${shop}" entry was successfully added.`);
	}
	return (
		<div className="edit_header container">
			<h3 className="mt-4 mb-4">Add an entry</h3>
			<EntryForm onSubmit={handleSubmit} />
		</div>
	);
}
