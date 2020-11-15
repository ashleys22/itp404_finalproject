export function fetchEntries() {
	return fetch("/entries").then((response) => {
		return response.json();
	});
}

export function fetchEntry(id) {
	return fetch(`/entries/${id}`).then((response) => {
		if (response.status >= 400) {
			return Promise.reject(
				`There was an error requesting the entry with an id of ${id}`
			);
		}
		return response.json();
	});
}

export function destroyEntry(id) {
	return fetch(`/entries/${id}`, {
		method: "DELETE",
	});
}

export function saveEntry(data) {
	const isEditing = data.hasOwnProperty("id"); // checks if object has id property
	const url = isEditing ? `/entries/${data.id}` : "/entries";
	const method = isEditing ? "PUT" : "POST";
	return fetch(url, {
		method,
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	}).then((response) => {
		return response.json();
	});
}
