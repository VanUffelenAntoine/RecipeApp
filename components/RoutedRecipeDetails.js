import React, {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {getMealById} from "../utils/MealAPI";
import {RecipeDetails} from "./RecipeDetails";

export const RoutedRecipeDetails = ({route}) => {
    const {recipe} = route.params
    const [recipeFull, setRecipeFull] = useState({});
    const navigation = useNavigation();

    useEffect(() => {
        const fetchFullRecipe = async () => setRecipeFull(await getMealById(recipe.idMeal));
        fetchFullRecipe();
        navigation.setOptions({title : recipeFull.strMeal});
        navigation.getParent().setOptions({headerShown : false});
        navigation.addListener('beforeRemove', () => {
            navigation.getParent().setOptions({headerShown : true});
        })
    },[recipe])

    return (<RecipeDetails recipe={recipeFull}/>)
}