import React, { useState, useEffect } from "react";
import "../../styles/home.css";
import Card from "./card";


export const Characters = () => {
	const [people, setPeople] = useState([]); // Initialize as an empty array

	// Fetch people data when the component mounts
	useEffect(() => {
		fetch("https://www.swapi.tech/api/people/")
			.then(res => res.json())
			.then((data) => setPeople(data.results)) // Use data.results to get the array of planets
			.catch(err => console.error("Error fetching planets:", err));
	}, []);


	return (
		<div className="all-things-people">
			<div className="people-text">Characters</div>
			<div className="people-container">
				<div className="container my-5">
					<div className="row">
						{people.map((person, index) => (
							<div className="col-md-3 mb-4" key={index}>
								<Card name={person.name} />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
