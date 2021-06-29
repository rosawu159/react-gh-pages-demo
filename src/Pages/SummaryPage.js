import React, { useEffect, useState } from "react";
import CountryItem from "../Components/Country";

const CountryListPage = () => {
	const [countries, setCountriesList] = useState([]);
	const [setError] = useState(null);

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
			setError(`Can't get country infomation.`);
		}
	}, []);

	return (
		<ul className="flex-center">
            {
                countries.map((c, index) => {
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
                })
            }
        </ul>
	);
};


export default CountryListPage;