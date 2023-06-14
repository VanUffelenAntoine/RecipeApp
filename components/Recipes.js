import {ScrollView, TouchableOpacity, View} from "react-native";
import {Card, Title} from "react-native-paper";
import React, {useEffect, useState} from "react";
import {getMealsByCategory} from "../utils/MealAPI";
import {useNavigation} from "@react-navigation/native";
import StackNavigator from "@react-navigation/stack/src/navigators/createStackNavigator";
import {RoutedRecipeDetails} from "./RoutedRecipeDetails";

const Stack = StackNavigator();

export const RecipeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="RecipesList" component={Recipes} options={{headerShown: false}}
                          initialParams={{category: 'beef', amount: 99}}/>
            <Stack.Screen name="RecipeDetails" component={RoutedRecipeDetails}/>
        </Stack.Navigator>
    )
}

export const Recipes = ({route}) => {
    const [recipes, setRecipes] = useState([]);
    const {category, amount} = route.params;
    const [categoryState, setCategoryState] = useState([category,amount]);
    const navigation = useNavigation();

    if (categoryState[0] !== category || categoryState[1] !== amount) setCategoryState([category,amount]);

    console.log(`Chosen category: ${category} ------------ Chosen amount: ${amount}`);


    //todo : Add loading indicator
    useEffect(() => {
        const fetchRecipe = async () => setRecipes(await getMealsByCategory(category));
        fetchRecipe();

        if (amount <= 1) {
            navigation.getParent().setOptions({title: `Recipe for ${category}`});
        } else if (amount > recipes.length) {
            navigation.getParent().setOptions({title: `${recipes.length !== 0 ? recipes.length : ''} Recipes for ${category}`});
        } else {
            navigation.getParent().setOptions({title: `${amount} recipes for ${category}`});
        }
    }, [categoryState]);


    const neededRecipes = recipes.slice(0, amount);

    if (neededRecipes.length === 0) return <View><Title>You chosen 0 recipes</Title></View>

    return <ScrollView>
        {recipes && neededRecipes.map(recipe => <RecipePreview key={recipe.idMeal} item={recipe}/>)}
    </ScrollView>
}

export const RecipePreview = ({item}) => {
    const navigation = useNavigation();
    const navigateRecipe = () => {
        const recipe = item
        navigation.navigate('RecipeDetails', {recipe})
    }

    return (<View>
        <TouchableOpacity onPress={navigateRecipe}>
            <Card mode={'outlined'} style={{margin: 10}}>
                <Card.Title title={item.strMeal}/>
                <Card.Cover source={{uri: `${item.strMealThumb}`}}/>
            </Card>
        </TouchableOpacity>

    </View>)
}