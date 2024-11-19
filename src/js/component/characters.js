import React, { useState, useEffect } from "react";
import "../../styles/home.css";
import CardChar from "./cardchar";


export const Characters = () => {
	const [people, setPeople] = useState([]); // Initialize as an empty array

	// Fetch people data when the component mounts
	useEffect(() => {
		fetch("https://obscure-space-palm-tree-x596gxj994wwfvwg4-3000.app.github.dev/get/initial")
			.then(res => res.json())
			.then((data) => setPeople(data.people_records)) // Use data.results to get the array of planets
			.catch(err => console.error("Error fetching planets:", err));
	}, []);



	return (
		<div className="all-things-people">
			<div className="people-text">Characters</div>
			<div className="people-container">
				<div className="container">
					<div className="planets">
						{people.map((person, index) => (
							<div className="planet" key={index}>
								<CardChar name={person.name} url={person.url} />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
