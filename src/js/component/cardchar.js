import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";



const CardChar = (props) => {

	const [character, setCharacter] = useState([]); // Initialize as an empty array
    const [uid, setUid] = useState("");
	const { store, actions } = useContext(Context);

	useEffect(() => {
		fetch(props.url)
			.then(res => res.json())
			.then((data) => {
                setCharacter(data.result.properties)
                setUid(data.result.uid)
            }
        ) // Use data.results to get the array of planets
			.catch(err => console.error("Error fetching characters:", err));
	}, [props.url]);


	return (
		<div className="card h-100">
			<div className="card-body d-flex flex-column">
				<h1 className="card-title">{character.name}</h1>
				<h5 className="card-height">Height: {character.height}</h5>
			    <h5 className="card-title">Mass: {character.mass}</h5>
				<h5 className="card-title">Gender: {character.gender}</h5>
                <Link to={"/chardetail/" + uid}><button>Button</button>
							</Link>
				<button onClick= {() => actions.addFavorite(character.name, uid, "character")} >Add Favorite</button>
			</div>
		</div>
	);
};

CardChar.propTypes = {
	name: PropTypes.string.isRequired,
};

export default CardChar;
