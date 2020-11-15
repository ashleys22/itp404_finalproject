import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
	return (
		<>
			<nav className="navbar navbar-expand">
				<div className="navbar w-100">
					<ul className="navbar-nav ml-auto text-center">
						<li className="nav-item">
							<Link to="/home" className="nav-link hoverNav">
								Home
							</Link>
						</li>
					</ul>
				</div>
				<div className="mx-auto position-relative">
					<Link to="/" className="nav-link hoverNav">
						<img src="/img/logo.png" width="100" alt="Logo" />
					</Link>
				</div>
				<div className="navbar w-100">
					<ul className="navbar-nav mr-auto text-center">
						<li className="nav-item">
							<Link to="/new" className="nav-link hoverNav">
								Add Entry
							</Link>
						</li>
					</ul>
				</div>
			</nav>
			<hr />
		</>
	);
}
