import { createContext, useEffect, useState } from 'react';

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
export const AppContext = createContext();

function AppProvider({ children }) {
    const [asyncLock, setAsyncLock] = useState("loading")
    const [searchTerm, setSearchTerm] = useState("a");
    const [cocktails, setCocktails] = useState([]);

    async function fetchDrinks() {
        setAsyncLock("loading");
        try {
            const response = await fetch(`${url}${searchTerm}`);
            const data = await response.json();
            if ("drinks" in data) {
                setCocktails(data.drinks.map(item => ({
                    id: item["idDrink"],
                    name: item["strDrink"],
                    image: item["strDrinkThumb"],
                    info: item["strAlcoholic"],
                    glass: item["strGlass"],
                })));
            } else {
                setCocktails([]);
            }
            setAsyncLock("ready")
        } catch (error) {
            console.error(error);
            setAsyncLock("ready");
        }
    }

    useEffect(() => { void (async () => await fetchDrinks())(); }, [searchTerm]);

    return (
        <AppContext.Provider value={{ asyncLock, cocktails, searchTerm, setSearchTerm }}>{children}</AppContext.Provider>
    );
}

export default AppProvider;
