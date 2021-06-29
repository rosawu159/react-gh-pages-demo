import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const CountryPage = () => {
	const [country, setCountry] = useState("");
	const [error, setError] = useState(null);

	async function getBorders(list) {
		const formattedList = list.map((code) => code).join(";");
		const res = await fetch(
			`https://restcountries.eu/rest/v2/alpha?codes=${formattedList}`
		);
		const resjson = await res.json();

		const nameList = resjson.map((info) => info.name);

		return nameList;
	}

	useEffect(() => {
		try {
			async function getCountryData(country) {
				const res = await fetch(
					`https://restcountries.eu/rest/v2/name/${country}?fields=name;nativeName;population;region;subregion;capital;topleveldomain;currencies;languages;borders;topLevelDomain;flag
					`
				);
				const resjson = await res.json();
				const languages = resjson[0].languages.map((l) => l.name).join(", ");
				const currencies = resjson[0].currencies.map((l) => l.name).join(", ");
				const population = resjson[0].population;

				if (resjson[0].borders.length > 0) {
					const borderNames = await getBorders(resjson[0].borders);
					resjson[0].borders = borderNames;
				}

				resjson[0].languages = languages;
				resjson[0].currencies = currencies;
				resjson[0].population = population;

				setCountry(resjson[0]);
			}

			getCountryData("Andorra");
		} catch (e) {
			setError("Something happened. Try again later.");
		}
	});

	const borderButtons = country.borders
		? country.borders.map((country, index) => (
				<Router key={index}>
					<Link to={`/${country}`}>{country}</Link>
				</Router>
		  ))
		: [];

	return (
		<div>
			{error && <p>{error}</p>}
			{country !== undefined && (
				<section className='country-container'>
					<div className='img-container'>
						<img src={country.flag} alt='country flag' />
					</div>
					<div className='details-container'>
						<h1>{country.name}</h1>
						<ul className='top-details'>
							<li>
								<span className='bold'>Native Name:</span> {country.nativeName}
							</li>
							<li>
								<span className='bold'>Population:</span> {country.population}
							</li>
							<li>
								<span className='bold'>Region:</span> {country.region}
							</li>
							<li>
								<span className='bold'>SubRegion:</span> {country.subregion}
							</li>
							<li>
								<span className='bold'>Capital:</span> {country.capital}
							</li>
						</ul>

						<ul className='middle-details'>
							<li>
								<span className='bold'>Top Level Domain:</span>{" "}
								{country.topLevelDomain}
							</li>
							<li>
								<span className='bold'>Currencies:</span> {country.currencies}
							</li>
							<li>
								<span className='bold'>Languages:</span> {country.languages}
							</li>
						</ul>
					</div>
				</section>
			)}
		</div>
	);
};

export default CountryPage;