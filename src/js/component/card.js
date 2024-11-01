import React from "react";
import PropTypes from "prop-types";

const Card = (props) => {
	return (
		<div className="card h-100">
			<div className="card-body d-flex flex-column">
				<h5 className="card-title">{props.name}</h5>
			</div>
		</div>
	);
};

Card.propTypes = {
	name: PropTypes.string.isRequired,
};

export default Card;
