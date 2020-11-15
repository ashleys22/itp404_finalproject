export function fetchEntries() {
	return fetch("/api/entries").then((response) => {
		return response.json();
	});
}

export function fetchEntry(id) {
	return fetch(`/api/entries/${id}`).then((response) => {
		if (response.status >= 400) {
			return Promise.reject(
				`There was an error requesting the entry with an id of ${id}`
			);
		}
		return response.json();
	});
}

export function destroyEntry(id) {
	return fetch(`/api/entries/${id}`, {
		method: "DELETE",
	});
}

export function saveEntry(data) {
	const isEditing = data.hasOwnProperty("id"); // checks if object has id property
	const url = isEditing ? `/api/entries/${data.id}` : "/api/entries";
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
