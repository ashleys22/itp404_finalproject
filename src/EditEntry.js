import React, { useEffect, useState } from "react";
import EntryForm from "./EntryForm";
import { useParams, useHistory } from "react-router-dom";
import { fetchEntry } from "./api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
export default function EditEntry({ editEntry, title }) {
	const { id } = useParams();
	const history = useHistory();
	const [entry, setEntry] = useState();
	const [error, setError] = useState();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		document.title = title;
	}, [title]);

	useEffect(() => {
		fetchEntry(id)
			.then(
				(entry) => {
					setEntry(entry);
				},
				(error) => {
					setError(error);
				}
			)
			.finally(() => {
				setIsLoading(false);
			});
	}, [id]);

	function handleSubmit(shop, drink, date, price, rating, location, note) {
		editEntry(entry, shop, drink, date, price, rating, location, note);
		history.push("/home");
		toast.success(`"${entry.shop}" entry was successfully edited.`);
	}
	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (error) {
		return (
			<div id="error" className="container">
				<h3 className="mt-5 mb-4">Page Not Found</h3>
				<p>{error}</p>
			</div>
		);
	}
	return (
		<>
			<div className="edit_header container">
				<h3 className="mt-4 mb-4">Edit entry</h3>
				<EntryForm entry={entry} onSubmit={handleSubmit} />
			</div>
		</>
	);
}
