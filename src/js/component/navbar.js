import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import logo from "../../img/star-wars-logo.png"; // Import your logo

export const Navbar = () => {
    const { store, actions } = useContext(Context); // Access the global store and actions

    return (
        <nav className="navbar navbar-light bg-light mb-3">
            <Link to="/">
                <img src={logo} alt="Star Wars Logo" style={{ width: "100px", marginRight: "10px" }} />
            </Link>
            <div className="dropdown">
                <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    Favorites ({store.favorites.length}) {/* Show the count of favorites */}
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                    {store.favorites.length === 0 ? (
                        <li className="dropdown-item">No favorites added</li> // Show message if no favorites exist
                    ) : (
                        store.favorites.map((favorite, index) => (
                            <li
                                key={index}
                                className="dropdown-item d-flex justify-content-between align-items-center"
                            >
                                {favorite.name} {/* Show the favorite name */}
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => actions.deleteFavorite(favorite.name)} // Call deleteFavorite action
                                >
                                    X {/* Delete button */}
                                </button>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </nav>
    );
};
