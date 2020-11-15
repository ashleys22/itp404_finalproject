import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function PageNotFound({ title }) {
	const location = useLocation();

	useEffect(() => {
		document.title = title;
	}, [title]);

	return (
		<div id="error" className="container">
			<h3 className="mt-5 mb-4">Page Not Found</h3>
			<p>
				The requested URL <code>{location.pathname}</code> was not found on this
				server.
			</p>
		</div>
	);
}
