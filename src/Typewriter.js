import React from "react";

export default function Typewriter({ message }) {
	return (
		<div id="welcome" className="container">
			<div className="row">
				<div className="p-4 col-12">
					<div className="typewriter">
						<h3 className="text-muted text-center">{message}</h3>
					</div>
				</div>
			</div>
		</div>
	);
}
