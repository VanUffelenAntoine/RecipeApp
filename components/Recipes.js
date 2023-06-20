import {ScrollView, TouchableOpacity, View} from "react-native";
import { Card, Title} from "react-native-paper";
import React, {useEffect, useState} from "react";
import {getMealsByCategory} from "../utils/MealAPI";
import {useNavigation} from "@react-navigation/native";
import StackNavigator from "@react-navigation/stack/src/navigators/createStackNavigator";
import {RoutedRecipeDetails} from "./RoutedRecipeDetails";
import {trackPromise, usePromiseTracker} from "react-promise-tracker";
import {LoadIndicator} from "./LoadIndicator";
import {Ionicons} from "@expo/vector-icons";
import {RecipeFilter} from "./RecipeFilter";

const Stack = StackNavigator();

export const RecipeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="RecipesList" component={Recipes} options={{headerShown: false}}
                          initialParams={{category: 'beef', amount: 1}}/>
            <Stack.Screen name="RecipeDetails" component={RoutedRecipeDetails}/>
        </Stack.Navigator>
    )
}

export const Recipes = ({route}) => {
    const {category, amount} = route.params;

    const [recipes, setRecipes] = useState([]);
    const [filter, setFilter] = useState(false);
    const [inputAmount, setInputAmount] = useState('0');

    const navigation = useNavigation();
    const {promiseInProgress} = usePromiseTracker();

    useEffect(() => {
        const fetchRecipe = async () => {
            const recipes = await getMealsByCategory(category);
            setRecipes(recipes);
            return recipes;
        };
        navigation.getParent().setOptions({title: `Fetching Recipes for ${category}`});
        trackPromise(fetchRecipe()).then((fetchRecipes) => {
            if (amount <= 1) {
                navigation.getParent().setOptions({title: `Recipe for ${category}`});
            } else if (amount > fetchRecipes.length) {
                navigation.getParent().setOptions({title: `${fetchRecipes.length !== 0 ? fetchRecipes.length : ''} Recipes for ${category}`});
            } else {
                navigation.getParent().setOptions({title: `${amount} recipes for ${category}`});
            }
            if (fetchRecipes.length === 0)
                setInputAmount(amount)
            else if (amount < fetchRecipes.length.toString())
                setInputAmount(amount);
            else
                setInputAmount(fetchRecipes.length.toString())

            navigation.getParent().setOptions({
                headerRight: () => (
                    <View>
                        <Ionicons style={{marginRight: 15}} name={'filter'} size={24} onPress={() => setFilter(!filter)}/>
                    </View>
                ),
            });
        });
    }, [category, amount]);

    const neededRecipes = recipes.slice(0, amount);

    if (promiseInProgress)
        return <LoadIndicator/>

    if (neededRecipes.length === 0)
        return <View><Title>You chosen 0 recipes</Title></View>

    return <View>
        <ScrollView>
            {filter && <RecipeFilter filter={filter} inputAmount={inputAmount}
                                     setInputAmount={setInputAmount} category={category}/>}
            {recipes && neededRecipes.map(recipe => <RecipePreview key={recipe.idMeal} item={recipe}
                                                                   navigation={navigation}/>)}
        </ScrollView>
    </View>
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