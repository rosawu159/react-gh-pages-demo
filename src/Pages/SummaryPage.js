import React, { useEffect, useState } from "react";
import CountryItem from "../Components/Country";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const CountryListPage = (props) => {
	const [countries, setCountriesList] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		try {
			async function getData() {
				const res = await fetch(
					"https://restcountries.eu/rest/v2/all?fields=name;capital;region;population;flag"
				);

				const resjson = await res.json();

				setCountriesList([...resjson]);
			}

			getData();
		} catch (e) {
			setError(`Can't pull right now. Try again later.`);
		}
	}, []);

	return (
		<ul className="flex-center">
				{countries.length > 0 &&
					!error &&
					countries
						.map((c, index) => {
							return (
								<CountryItem
									key={index}
									flag={c.flag}
									name={c.name}
									region={c.region}
									capital={c.capital}
									population={c.population}
								/>
							);
						})}
			</ul>
	);
};


export default CountryListPage;