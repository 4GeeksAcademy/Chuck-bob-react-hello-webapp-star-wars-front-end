import React, { useState, useEffect } from "react";
import "../../styles/home.css";
import Card from "./card";


export const Planets = () => {
	const [planets, setPlanets] = useState([]); // Initialize as an empty array

	// Fetch planets data when the component mounts
	useEffect(() => {
		fetch("https://www.swapi.tech/api/planets/")
			.then(res => res.json())
			.then((data) => setPlanets(data.results)) // Use data.results to get the array of planets
			.catch(err => console.error("Error fetching planets:", err));
	}, []);


	return (
		<div className="all-things-planets">
			<div className="planets-text">PLANETS</div>
			<div className="planet-container">
				<div className="container my-5">
					<div className="row">
						{planets.map((planet, index) => (
							<div className="col-md-3 mb-4" key={index}>
								<Card name={planet.name} />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
