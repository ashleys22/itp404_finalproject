import React, { useState, useContext } from "react";
import ConfirmDeleteIssueModal from "./ConfirmDeleteIssueModal";
import { Link } from "react-router-dom";
import { DataStoreContext } from "./contexts";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
export default function Entries({ deleteEntry }) {
	const { entries } = useContext(DataStoreContext);
	const [isConfirmationShown, setIsConfirmationShown] = useState(false);
	const [entryToBeDeleted, setEntryToBeDeleted] = useState();

	function confirmDeletion() {
		deleteEntry(entryToBeDeleted);
		setIsConfirmationShown(false);
		// Display a success toast
		toast.success(`"${entryToBeDeleted.shop}" entry was successfully deleted.`);
	}

	function showDeleteConfirmation(entry) {
		setIsConfirmationShown(true);
		setEntryToBeDeleted(entry);
	}

	function hideDeleteConfirmation() {
		setIsConfirmationShown(false);
	}
	return (
		<div id="entries">
			{isConfirmationShown && (
				<ConfirmDeleteIssueModal
					onClose={hideDeleteConfirmation}
					onConfirm={confirmDeletion}
				/>
			)}
			<h1>Recently Visited</h1>
			<table className="table table-hover table-responsive">
				<thead>
					<tr>
						<th></th>
						<th>Store</th>
						<th>Drink</th>
						<th>Price</th>
						<th>Date</th>
						<th>Rating</th>
						<th>Location</th>
						<th>Note</th>
					</tr>
				</thead>
				<tbody>
					{entries.map((entry) => {
						return (
							<tr key={entry.id} data-testid="entry">
								<>
									<td>
										<button
											type="button"
											data-testid="delete-button"
											className="btn btn-outline-danger delete-btn"
											onClick={() => showDeleteConfirmation(entry)}
										>
											Delete
										</button>
									</td>
									<td data-testid="shop">{entry.shop}</td>
									<td data-testid="drink">{entry.drink}</td>
									<td data-testid="price">{entry.price}</td>
									<td data-testid="date">{entry.date}</td>
									<td data-testid="rating">{entry.rating}</td>
									<td data-testid="location">{entry.location}</td>
									<td data-testid="note">{entry.note}</td>
									<td>
										<Link
											to={`/entries/${entry.id}`}
											className="btn btn-outline-danger delete-btn"
										>
											Edit
										</Link>
									</td>
								</>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
