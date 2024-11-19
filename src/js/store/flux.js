import { findAllInRenderedTree } from "react-dom/test-utils";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			favorites: []
		},
		actions: {
			addFavorite: (name, uid, type) => {
				const store = getStore();
				const actions = getActions(); // Access actions to call deleteFavorite

				// Check if the favorite already exists
				const existingFavorite = store.favorites.find((favorite) => favorite.name === name);

				if (!existingFavorite) {
					// If the item does not exist, add it to favorites
					const newFave = { name, uid, type };

					fetch("https://obscure-space-palm-tree-x596gxj994wwfvwg4-3000.app.github.dev/user/1/favorites", {
						method: "POST", // Send a POST request to add the favorite
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(newFave), // Send the favorite details in the request body
					})
						.then((res) => {
							if (!res.ok) throw new Error("Failed to add favorite");
							return res.json();
						})
						.then((data) => {
							if (data && data.favorite) {
								// Update the favorites in the store
								setStore({ favorites: [...store.favorites, data.favorite] });
								console.log("Favorite added successfully:", data.favorite);
							}
						})
						.catch((err) => console.error("Error adding favorite:", err));
				} else {
					// If the favorite exists, remove it
					actions.deleteFavorite(name); // Call the deleteFavorite action
				}
			},







			deleteFavorite: (name) => {
				const store = getStore();
			
				// Find the favorite to delete by name
				const favoriteToDelete = store.favorites.find((favorite) => favorite.name === name);
			
				if (!favoriteToDelete) {
					console.error("Favorite not found");
					return;
				}
			
				// Send DELETE request to the back end
				fetch(`https://obscure-space-palm-tree-x596gxj994wwfvwg4-3000.app.github.dev/user/1/favorites/${favoriteToDelete.id}`, {
					method: "DELETE",
				})
					.then((res) => {
						if (!res.ok) throw new Error("Failed to delete favorite");
						return res.json();
					})
					.then(() => {
						// Update the front-end store to remove the deleted favorite
						const filteredArray = store.favorites.filter(
							(element) => element.id !== favoriteToDelete.id
						);
						setStore({ favorites: filteredArray }); // Update the store
						console.log("Favorite deleted successfully");
					})
					.catch((err) => console.error("Error deleting favorite:", err));
			},
			


			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				fetch("https://obscure-space-palm-tree-x596gxj994wwfvwg4-3000.app.github.dev/user/1/favorites") // Replace `1` with the appropriate user ID if dynamic
					.then((res) => res.json())
					.then((data) => {
						setStore({ favorites: data }); // Store favorites in the global state
					})
					.catch((err) => console.error("Error fetching favorites:", err));
			},

			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
