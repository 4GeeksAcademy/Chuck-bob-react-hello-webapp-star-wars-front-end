import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context); // Access store and actions from context

	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">Star Wars</span>
			</Link>
			<div className="ml-auto">
				<Link to="/demo">
					<button className="btn btn-primary">Ugh...</button>
				</Link>
			</div>

			<div className="dropdown">
				<button
					className="btn btn-secondary dropdown-toggle"
					type="button"
					id="dropdownMenuButton1"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					Favorites ({store.favorites.length})
				</button>
				<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
					{store.favorites.length === 0 ? (
						<li className="dropdown-item">No favorites added</li>
					) : (
						store.favorites.map((favorite, index) => (
							<li key={index} className="dropdown-item d-flex justify-content-between align-items-center">
								{favorite.name}
								<button
									className="btn btn-sm btn-danger"
									onClick={() => actions.deleteFavorite(favorite.name)}
								>
									&times;
								</button>
							</li>
						))
					)}
				</ul>
			</div>
		</nav>
	);
};
