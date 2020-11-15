export function entriesReducer(entries, action) {
	if (action.type === "ENTRIES_LOADED") {
		return action.payload;
	}
	if (action.type === "ENTRY_DELETED") {
		return entries.filter((entry) => {
			return entry.id !== action.payload.id;
		});
	}
	if (action.type === "ENTRY_EDITED") {
		return entries.map((entry) => {
			if (action.payload.editedEntry.id === entry.id) {
				return action.payload.editedEntry;
			} else {
				return entry;
			}
		});
	}
	if (action.type === "ENTRY_CREATED") {
		return entries.concat(action.payload.newEntry);
	}
	return entries;
}
