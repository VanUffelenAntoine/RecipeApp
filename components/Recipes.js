import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Button, Card, Modal, TextInput, Title} from "react-native-paper";
import React, {useEffect, useState} from "react";
import {getCategories, getMealsByCategory} from "../utils/MaelAPI";
import {useNavigation} from "@react-navigation/native";

export const Recipes = ({route}) => {
    const [recipes, setRecipes] = useState([]);
    const {category, amount} = route.params;
    const navigation = useNavigation();

    //todo : Add loading indicator
    useEffect(() => {
        const fetchRecipe = async () => setRecipes(await getMealsByCategory(category));
        fetchRecipe();
        if (amount <= 1) navigation.setOptions({title: `Recipe for ${category}`})
        else navigation.setOptions({title: `${amount} recipes for ${category}`})
    }, [category]);

    const neededRecipes = recipes.slice(0,amount);

    if (neededRecipes.length === 0) return <View><Title>You chose 0 recipes</Title></View>

    return <ScrollView>
        {recipes && neededRecipes.map(recipe => <RecipePreview key={recipe.idMeal} item={recipe}/>)}
    </ScrollView>
}

export const RecipePreview = ({item}) => {

    return (<View>
        <Card mode={'outlined'} style={{margin: 10}}>
            <Card.Title title={item.strMeal}/>
            <Card.Cover source={{uri: `${item.strMealThumb}`}}/>
        </Card>

    </View>)
}