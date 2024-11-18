import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import logo from "../../img/star-wars-logo.png";

export const Navbar = () => {
    const { store } = useContext(Context); // Access the global store

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
                    Favorites ({store.favorites.length})
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    {store.favorites.length === 0 ? (
                        <li className="dropdown-item">No favorites added</li>
                    ) : (
                        store.favorites.map((favorite, index) => (
                            <li key={index} className="dropdown-item">
                                {favorite.name}
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </nav>
    );
};
