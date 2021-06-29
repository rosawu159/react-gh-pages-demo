import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const CountryItem = ({ key, name, region, population, capital, flag }) => {

	return (
		<Router key={key}>
			<Link className="country-link" to={name}>
				<div className="img-container">
					<img src={flag} alt={`${name}=flag`} />
				</div>
				<div>
					<h1>{name}</h1>
					<ul className="details-list-container">
						<li>
							<span className="bold">Population:</span> {population}	
						</li>
						<li>
							<span className="bold">Region:</span> {region}
						</li>
						<li>
							<span className="bold">Capital:</span> {capital}
						</li>
					</ul>
				</div>
			</Link>
		</Router>
	);
};

export default CountryItem;