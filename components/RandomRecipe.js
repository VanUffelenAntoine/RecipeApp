import React, {useEffect, useState} from "react";
import {getRandomMeal} from "../utils/MealAPI";
import {RecipeDetails} from "./RoutedRecipeDetails";
import {Text} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import {TouchableOpacity, View} from "react-native";
import { Feather } from '@expo/vector-icons';

export const RandomRecipe = () => {
    const [randomRecipe, setRandomRecipe]= useState({});
    const navigation = useNavigation();

    navigation.setOptions({
        headerRight: () => (
            <View style={{margin:10}}><TouchableOpacity onPress={fetchRecipe}><Feather name="refresh-ccw" size={24}  /></TouchableOpacity></View>
        ),
    })

    const fetchRecipe = async () => setRandomRecipe(await getRandomMeal());
    useEffect(() => {
        fetchRecipe();
    }, [])


    return <RecipeDetails recipe={randomRecipe}>
        <Text variant={"titleSmall"}>Category : {randomRecipe.strCategory}</Text>
        <Text variant={"titleSmall"}>Origin : {randomRecipe.strArea}</Text>
    </RecipeDetails>
}