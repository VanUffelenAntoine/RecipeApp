import {ScrollView, TouchableOpacity, View} from "react-native";
import {Button, Card, TextInput, Title} from "react-native-paper";
import React, {useEffect, useState} from "react";
import {getMealsByCategory} from "../utils/MealAPI";
import {useNavigation} from "@react-navigation/native";
import StackNavigator from "@react-navigation/stack/src/navigators/createStackNavigator";
import {RoutedRecipeDetails} from "./RoutedRecipeDetails";
import {trackPromise, usePromiseTracker} from "react-promise-tracker";
import {LoadIndicator} from "./LoadIndicator";
import DropDown from "react-native-paper-dropdown";
import {useCategoryContext} from "../contexts/CategoryContext";
import {Ionicons} from "@expo/vector-icons";

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
    const [recipes, setRecipes] = useState([]);
    const {category, amount} = route.params;
    const [categoryState, setCategoryState] = useState(category);
    const [prevAmount, setPrevAmount] = useState(999);
    const navigation = useNavigation();
    const {promiseInProgress} = usePromiseTracker();
    const [showDropDown, setShowDropDown] = useState(false);
    const [filter, setFilter] = useState(false);
    const categories = useCategoryContext();
    const [dropdownCat, setDropdownCat] = useState(categories[0].strCategory);
    const [inputAmount, setInputAmount] = useState('0');

    console.log(amount);

    const dropdDownList = categories.map((cat) => {
        return {label: cat.strCategory, value: cat.strCategory}
    });

    if (categoryState !== category) setCategoryState(category);
    if (prevAmount !== amount) setPrevAmount(amount);

    useEffect(() => {
        setCategoryState(category);
        const fetchRecipe = async () => setRecipes(await getMealsByCategory(category));
        navigation.getParent().setOptions({title: `Fetching Recipes for ${category}`});
        trackPromise(fetchRecipe()).then(() => {
            console.log('recipe lenght ' + recipes.length)
            if (amount <= 1) {
                navigation.getParent().setOptions({title: `Recipe for ${category}`});
            } else if (amount > recipes.length) {
                navigation.getParent().setOptions({title: `${recipes.length !== 0 ? recipes.length : ''} Recipes for ${category}`});
            } else {
                navigation.getParent().setOptions({title: `${amount} recipes for ${category}`});
            }
            if (recipes.length === 0)
                setInputAmount(amount)
            else if (amount < recipes.length.toString())
                setInputAmount(amount);
            else
                setInputAmount(recipes.length.toString())

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
            {filter && <Card mode={'outlined'} style={{margin: 10}}>
                <Card.Title title={'Filter Recipes'}/>
                <Card.Content>
                    <DropDown
                        label={"Category"}
                        mode={"outlined"}
                        visible={showDropDown} onDismiss={() => setShowDropDown(false)}
                        showDropDown={() => setShowDropDown(true)} value={dropdownCat} setValue={setDropdownCat}
                        list={dropdDownList}/>
                    <TextInput
                        type={'outlined'}
                        label={'Amount'}
                        style={{marginTop: 15}}
                        keyboardType={'numeric'}
                        onChangeText={(text) => setInputAmount(text)}
                        value={inputAmount.toString()}
                    />
                </Card.Content>
                <Card.Actions>
                    <TouchableOpacity onPress={() => navigation.navigate('Recipes', {
                        screen: 'RecipesList',
                        params: {category: dropdownCat, amount: inputAmount}
                    })}>
                        <Button>Apply changes</Button>
                    </TouchableOpacity>
                </Card.Actions>
            </Card>}
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