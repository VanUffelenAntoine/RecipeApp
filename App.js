import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {Categories} from "./components/Categories";
import {CategoryDetails} from "./components/CategoryDetails";
import {Recipes, RecipeStack} from "./components/Recipes";

import {createDrawerNavigator} from "@react-navigation/drawer";
import {getSingleCategory} from "./utils/MealAPI";
import {HomeScreen} from "./components/HomeScreen";
import {RandomRecipe} from "./components/RandomRecipe";

const Drawer = createDrawerNavigator();

export default function App() {
    const [defaultCategoryDetails,setDefaultCategoryDetails] = useState({});

    useEffect(()=> {
        const defaultCategoryFetch = async () => {
            setDefaultCategoryDetails(await getSingleCategory())};
        defaultCategoryFetch();
    },[])

    console.log('default cat: ' + JSON.stringify(defaultCategoryDetails));



    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name="Home" component={HomeScreen}/>
                <Drawer.Screen name="Categories" component={Categories}/>
                <Drawer.Screen name="CategoryDetails" component={CategoryDetails} initialParams={{item: defaultCategoryDetails}}/>
                <Drawer.Screen name={"Recipes"} component={RecipeStack}/>
                <Drawer.Screen name={"Random meal"} component={RandomRecipe}/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

