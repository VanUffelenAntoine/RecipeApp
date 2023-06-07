import React, {useEffect, useState} from "react";
import {getRandomMeal} from "../utils/MaelAPI";
import {RecipeDetails} from "./RoutedRecipeDetails";
import {Text} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import {TouchableOpacity, View} from "react-native";
import { Feather } from '@expo/vector-icons';

export const RandomRecipe = () => {
    const [randomRecipe, setRandomRecipe]= useState({});
    const navigation = useNavigation();
    const ingredients = [];
    const measures = [];

    navigation.setOptions({
        headerRight: () => (
            <View style={{margin:10}}><TouchableOpacity onPress={fetchRecipe}><Feather name="refresh-ccw" size={24}  /></TouchableOpacity></View>
        ),
    })

    const fetchRecipe = async () => setRandomRecipe(await getRandomMeal());
    useEffect(() => {
        fetchRecipe();
    }, [])


    for (let i = 1; i <= 20; i++) {
        const ingredientKey = `strIngredient${i}`;
        const measureKey = `strMeasure${i}`;

        if (randomRecipe[ingredientKey] && randomRecipe[measureKey]) {
            ingredients.push(randomRecipe[ingredientKey]);
            measures.push(randomRecipe[measureKey]);
        }
    }

    return <RecipeDetails recipe={randomRecipe}>
        <Text variant={"titleSmall"}>Category : {randomRecipe.strCategory}</Text>
        <Text variant={"titleSmall"}>Origin : {randomRecipe.strArea}</Text>
    </RecipeDetails>
}