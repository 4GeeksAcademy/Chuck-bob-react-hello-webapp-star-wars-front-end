import { findAllInRenderedTree } from "react-dom/test-utils";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			favorites: []
		},
		actions: {
			addFavorite: (name, uid, type) => {
				const store = getStore(); // Access the current store
			
				// Check if the favorite already exists in the store
				const existingFavorite = store.favorites.find((favorite) => favorite.uid === uid);
			
				if (!existingFavorite) {
					// Prepare the favorite object
					const newFavorite = { name, uid, type };
			
					// Send the favorite to the back-end
					fetch("https://obscure-space-palm-tree-x596gxj994wwfvwg4-3000.app.github.dev/user/1/favorites", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(newFavorite), // Send favorite details in the request body
					})
						.then((res) => res.json())
						.then((data) => {
							// Update the global store with the newly added favorite
							setStore({ favorites: [...store.favorites, data.favorite] });
						})
						.catch((err) => console.error("Error adding favorite:", err));
				} else {
					console.warn("Favorite already exists. Consider toggling or showing a message.");
				}
			},
			
			

			deleteFavorite: (name) => {
				let filteredArray = getStore().favorites.filter(
					(element) => element.name !== name
				);
				setStore({ favorites: filteredArray });
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
