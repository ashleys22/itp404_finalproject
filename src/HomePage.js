import React, { useEffect } from "react";
import Typewriter from "./Typewriter";
import Entries from "./Entries";
import Recommended from "./Recommended";

export default function HomePage({ deleteEntry, title }) {
	useEffect(() => {
		document.title = title;
	}, [title]);

	return (
		<>
			<Typewriter message="Your Past Entries" />
			<Entries deleteEntry={deleteEntry} />
			<Recommended />
		</>
	);
}
