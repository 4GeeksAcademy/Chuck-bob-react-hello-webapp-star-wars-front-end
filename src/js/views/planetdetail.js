import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

const PlanetDetail = () => {
	const params = useParams();
	const [planet, setPlanet] = useState({}); 
    const [description, setDescription] = useState([]); 

	useEffect(() => {
		fetch("https://www.swapi.tech/api/planets/" + params.uid) 
			.then((res) => res.json())
			.then((data) => {
                setPlanet(data.result.properties)
                setDescription(data.result.description)
            })
			.catch((err) => console.error("Error fetching planet:", err));
	}, [params.uid]); 

	return (
		<div>
			<div className="detail-topper">
				<div className="detail-image">IMAGE</div>
				<div className="detail-name-description">
					<div className="detail-name">{planet.name || "Unknown Name"}</div>
					<div className="detail-description">{description}</div>
				</div>
			</div>
			<div className="detail-bottom">
				<div className="bottom-name">Name <br /> {planet.name || "N/A"} </div>
				<div className="bottom-mass">Mass <br /> {planet.mass || "N/A"}</div>
				<div className="bottom-diameter">Diameter <br /> {planet.diameter || "N/A"} </div>
				<div className="bottom-gravity">Gravity <br /> {planet.gravity || "N/A"} </div>
				<div className="bottom-climate">Climate <br /> {planet.climate || "N/A"} </div>
				<div className="bottom-population">Population <br /> {planet.population || "N/A"} </div>
			</div>
		</div>
	);
};

PlanetDetail.propTypes = {
	url: PropTypes.string
};

export default PlanetDetail;
