import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const Card = (props) => {

	const [planet, setPlanet] = useState([]); // Initialize as an empty array
	const [uid, setUid] = useState("");
	const { store, actions } = useContext(Context);


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
			<div className="card-body">
				<h1 className="card-title">{planet.name}</h1>
				<h5 className="card-terrnain">Terrain: {planet.terrain}</h5>
				<h5 className="card-gravity">Gravity: {planet.gravity}</h5>
				<h5 className="card-population">Population: {planet.population}</h5>
				<Link to={"/planetdetail/" + uid}><button>Button</button>
				</Link>
				<button
					onClick={() => actions.addFavorite(planet.name, uid, "planets")}
					className="favorite-button"
				>
					&#9829; {/* This renders a heart symbol */}
				</button>

				{/* <button onClick={() => actions.deleteFavorite(planet.name)}>delete Favorite</button> */}
			</div>
		</div>
	);
};

Card.propTypes = {
	name: PropTypes.string.isRequired,
};

export default Card;
