import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";


const CharDetail = (props) => {

	const params = useParams();

	const [character, setCharacter] = useState([]); // Initialize as an empty array
	const [description, setDescription] = useState([]); // Initialize as an empty array


	useEffect(() => {
		fetch("https://www.swapi.tech/api/people/" + params.uid)
			.then(res => res.json())
			.then((data) => {
				setCharacter(data.result.properties)
				setDescription(data.result.description) 
			})
			  // Use data.results to get the array of planets
			.catch(err => console.error("Error fetching characters:", err));
	}, [props.url]);


	return (

		<div>
			<div className="detail-topper">
				<div className="detail-iamge">IMAGE</div>
				<div className="detail-name-description">
					<div className="detail-name"> {character.name}</div>
					<div className="detail-description"> {description} </div>
				</div>
			</div>
			<div className="detail-bottom">
				<div className="bottom-name">Name <br></br> {character.name} </div>
				<div className="bottom-birth">Birth Year <br></br> {character.birth_year}</div>
				<div className="bottom-gender">Gender <br></br> {character.gender} </div>
				<div className="bottom-height">Height <br></br> {character.height} </div>
				<div className="bottom-skin">Skin Color <br></br> {character.skin_color} </div>
				<div className="bottom-eye">Eye Color <br></br> {character.eye_color} </div>
			</div>
		</div>
	);
};

CharDetail.propTypes = {
	name: PropTypes.string
};

export default CharDetail;
