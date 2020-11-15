import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Typewriter from "./Typewriter";

export default function AboutPage({ title }) {
	useEffect(() => {
		document.title = title;
	}, [title]);

	return (
		<>
			<Typewriter message="Welcome!" />
			<div id="about-wrapper" className="container d-flex">
				<div id="boba-img">
					<img src="/img/boba.jpg" alt="Boba" />
				</div>

				<div id="about">
					<h3 id="about-title" className="display-4 mb-3">
						Boba Log
					</h3>
					<p className="lead">
						Welcome to your personal boba diary! This website allows you to
						record each boba drink you've ordered from different shops. You can
						write a short review or description of your order, and in the future
						when deciding which drink to get at a boba store, come back to this
						log to read your past notes. The home page also features a sidebar
						of recommended shops for you to visit, sorted by past average
						ratings. In the future, if you're not sure which store to visit,
						simply visit this journal and rely on the Recommended panel tailored
						specifically to your taste!
					</p>
					<Link to="/home" className="nav-link d-flex justify-content-end">
						<button id="about-button">Continue to Entries</button>
					</Link>
				</div>
			</div>
		</>
	);
}
