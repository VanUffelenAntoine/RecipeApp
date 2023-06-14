import {Card, Text} from "react-native-paper";
import {ScrollView} from "react-native";
import React, {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {getMealById} from "../utils/MealAPI";
import { AntDesign } from '@expo/vector-icons';

export const RecipeDetails = ({recipe,children}) => {
    const ingredients = [];
    const measures = [];

    for (let i = 1; i <= 20; i++) {
        const ingredientKey = `strIngredient${i}`;
        const measureKey = `strMeasure${i}`;

        if (recipe[ingredientKey] && recipe[measureKey]) {
            ingredients.push(recipe[ingredientKey]);
            measures.push(recipe[measureKey]);
        }
    }

    return <ScrollView>
        <Card mode={'outlined'} style={{margin: 10}}>
            <Card.Content>
                <Text variant={"titleLarge"}>{recipe.strMeal}</Text>
                {children}
                <Text variant={"titleSmall"}>Ingredients : </Text>
                {ingredients.map((ingredient,index) => {
                    return <Text key={index}><AntDesign name="right" size={10} />{`${ingredient} : ${measures[index]}`}</Text>
                })}
                <Text variant={"bodyMedium"}>{recipe.strMealDescription}</Text>
                <Text variant={"titleSmall"}>Instructions: </Text>
                <Text variant={"bodySmall"}>{recipe.strInstructions}</Text>
            </Card.Content>
            <Card.Cover source={{uri: `${recipe.strMealThumb}` }}/>
        </Card>
    </ScrollView>
}

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