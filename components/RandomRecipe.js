import React from "react";
import {RecipeDetails} from "./RoutedRecipeDetails";
import {Text} from "react-native-paper";

export const RandomRecipe = ({randomRecipe}) => {

    if (!randomRecipe)
        return <></>

    return  <RecipeDetails recipe={randomRecipe}>
            <Text variant={"titleSmall"}>Category : {randomRecipe.strCategory}</Text>
            <Text variant={"titleSmall"}>Origin : {randomRecipe.strArea}</Text>
        </RecipeDetails>
}