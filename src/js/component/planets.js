import React, { useState, useEffect } from "react";
import "../../styles/home.css";
import Card from "./card";


export const Planets = () => {
	const [planets, setPlanets] = useState([]); // Initialize as an empty array

	// Fetch planets data when the component mounts
	useEffect(() => {
		fetch("https://obscure-space-palm-tree-x596gxj994wwfvwg4-3000.app.github.dev/get/initial")
			.then(res => res.json())
			.then((data) => setPlanets(data.planet_records)) // Use data.results to get the array of planets
			.catch(err => console.error("Error fetching planets:", err));
	}, []);


	return (
		<div className="all-things-planets">
			<div className="planets-text">PLANETS</div>
			<div className="planet-container">
				<div className="container">
					<div className="planets">
						{planets.map((planet, index) => (
							<div className="planet" key={index}>
								<Card name={planet.name} url={planet.url} />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
