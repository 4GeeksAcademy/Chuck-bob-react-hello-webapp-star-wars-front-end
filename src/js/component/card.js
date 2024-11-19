import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const Card = (props) => {

	const [planet, setPlanet] = useState([]); // Initialize as an empty array
	const [uid, setUid] = useState("");
	const { store, actions } = useContext(Context);


	useEffect(() => {
		fetch(props.url) // Assuming `props.url` points to `/people/<id>`
			.then(res => res.json())
			.then(data => {
				if (data) {
					setPlanet(data); // Adjust if backend response differs
					setUid(data.id);    // Ensure `data.id` is correct
				}
			})
			.catch(err => console.error("Error fetching planets details:", err));
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
					onClick={() => actions.addFavorite(planet.name, planet.id || planet.uid, "planets")}
					className="favorite-button"
				>
					&#9829; {/* Heart symbol */}
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
