import {ScrollView, TouchableOpacity, View} from "react-native";
import {Card, Title} from "react-native-paper";
import React, {useEffect, useState} from "react";
import {getMealsByCategory} from "../utils/MealAPI";
import {useNavigation} from "@react-navigation/native";
import StackNavigator from "@react-navigation/stack/src/navigators/createStackNavigator";
import {RoutedRecipeDetails} from "./RoutedRecipeDetails";
import {trackPromise, usePromiseTracker} from "react-promise-tracker";
import {LoadIndicator} from "./LoadIndicator";

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
    const [categoryState, setCategoryState] = useState(category);
    const [prevAmount, setPrevAmount] = useState(999);
    const navigation = useNavigation();
    const {promiseInProgress} = usePromiseTracker();

    if (categoryState !== category) setCategoryState(category);
    if (prevAmount !== amount) setPrevAmount(amount);

    useEffect(() => {
        const fetchRecipe = async () => setRecipes(await getMealsByCategory(category));
        navigation.getParent().setOptions({title: `Fetching Recipes for ${category}`});
        trackPromise(fetchRecipe()).then(() => {
            if (amount <= 1) {
                navigation.getParent().setOptions({title: `Recipe for ${category}`});
            } else if (amount > recipes.length) {
                navigation.getParent().setOptions({title: `${recipes.length !== 0 ? recipes.length : ''} Recipes for ${category}`});
            } else {
                navigation.getParent().setOptions({title: `${amount} recipes for ${category}`});
            }
        });

    }, [categoryState, amount]);

    const neededRecipes = recipes.slice(0, amount);

    if (promiseInProgress)
        return <LoadIndicator/>

    if (neededRecipes.length === 0)
        return <View><Title>You chosen 0 recipes</Title></View>

    return <ScrollView>
        {recipes && neededRecipes.map(recipe => <RecipePreview key={recipe.idMeal} item={recipe}
                                                               navigation={navigation}/>)}
    </ScrollView>
}

export const RecipePreview = ({item, navigation}) => {
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