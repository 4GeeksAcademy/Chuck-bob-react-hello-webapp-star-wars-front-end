import { findAllInRenderedTree } from "react-dom/test-utils";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			favorites: []
		},
		actions: {
			addFavorite: (name, uid, type) => {
				const store = getStore(); // Retrieve the latest store
			
				// Use the find method to check if an item with the same uid already exists
				const existingFavorite = store.favorites.find((favorite) => favorite.uid === uid);
			
				if (!existingFavorite) {
					// If the item does not exist, add it to favorites
					const newFave = { name, uid, type };
					const newArr = [...store.favorites, newFave];
					setStore({
						favorites: newArr // Updated favorites array
					});
				} else {
					getActions().deleteFavorite(name);
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
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
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
