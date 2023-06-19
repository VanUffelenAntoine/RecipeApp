import {createContext, useContext, useEffect, useState} from "react";
import {getCategories} from "../utils/MealAPI";

const CategoryContext = createContext();

export function CategoryDataProvider({children}) {
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => setCategories(await getCategories());
        fetchCategories()

    }, []);


    return <CategoryContext.Provider value={categories}>
        {children}
    </CategoryContext.Provider>
}

export const useCategoryContext = () => useContext(CategoryContext);