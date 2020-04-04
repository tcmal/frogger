import React from "react";
import { Link } from "react-router-dom";

export default ({ sub }) => (
	<div className="subSidebar">
		<h2>{sub.name}</h2>
		<span className="owner">Owned by <Link to={"/u/" + sub.owner_name}>/u/{sub.owner_name}</Link></span>

		<p>{sub.description}</p>
	</div>
);