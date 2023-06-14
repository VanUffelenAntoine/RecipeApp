import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {Categories} from "./components/Categories";
import {CategoryDetails} from "./components/CategoryDetails";
import {Recipes, RecipeStack} from "./components/Recipes";

import {createDrawerNavigator} from "@react-navigation/drawer";
import {getRandomMeal, getSingleCategory} from "./utils/MealAPI";
import {HomeScreen} from "./components/HomeScreen";
import {RandomRecipe} from "./components/RandomRecipe";
import {TouchableOpacity, View} from "react-native";
import {Feather} from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

export default function App() {
    const [defaultCategoryDetails, setDefaultCategoryDetails] = useState({});
    const [randomRecipe, setRandomRecipe] = useState({});

    const fetchRecipe = async () => setRandomRecipe(await getRandomMeal());
    useEffect(() => {
        const defaultCategoryFetch = async () => {
            setDefaultCategoryDetails(await getSingleCategory())
        };
        fetchRecipe();
        defaultCategoryFetch();
    }, []);

    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name="Home" component={HomeScreen}/>
                <Drawer.Screen name="Categories" component={Categories}/>
                <Drawer.Screen name="CategoryDetails" component={CategoryDetails}
                               initialParams={{item: defaultCategoryDetails}}/>
                <Drawer.Screen name={"Recipes"} component={RecipeStack}/>
                <Drawer.Screen name={"Random recipe"}
                               options={{
                                   headerRight: () => (
                                       <View style={{margin: 10}}><TouchableOpacity onPress={fetchRecipe}><Feather
                                           name="refresh-ccw" size={24} /></TouchableOpacity></View>
                                   ),
                               }}>
                    {
                        (props) => <RandomRecipe {...props} randomRecipe={randomRecipe}/>
                    }
                </Drawer.Screen>
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

