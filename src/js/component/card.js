import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Card = (props) => {

	const [planet, setPlanet] = useState([]); // Initialize as an empty array

    const [uid, setUid] = useState("");
	
	useEffect(() => {
		fetch(props.url)
			.then(res => res.json())
			.then((data) => {
                setPlanet(data.result.properties)
                setUid(data.result.uid)
            }
        ) // Use data.results to get the array of planets
			.catch(err => console.error("Error fetching planet:", err));
	}, [props.url]);



	return (
		<div className="card h-100">
			<div className="card-body d-flex flex-column">
				<h1 className="card-title">{planet.name}</h1>
				<h5 className="card-title">Terrain: {planet.terrain}</h5>
				<h5 className="card-title">Gravity: {planet.gravity}</h5>
				<h5 className="card-title">Population: {planet.population}</h5>
				<Link to={"/planetdetail/" + uid}><button>Button</button>
							</Link>
			</div>
		</div>
	);
};

Card.propTypes = {
	name: PropTypes.string.isRequired,
};

export default Card;
