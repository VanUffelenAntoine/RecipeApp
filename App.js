import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {Categories} from "./components/Categories";
import {CategoryDetails} from "./components/CategoryDetails";
import {Recipes, RecipeStack} from "./components/Recipes";

import {createDrawerNavigator} from "@react-navigation/drawer";
import {getSignleCategory} from "./utils/MaelAPI";
import {HomeScreen} from "./components/HomeScreen";
import {RecipeDetails} from "./components/RecipeDetails";
import {RandomRecipe} from "./components/RandomRecipe";

const Drawer = createDrawerNavigator();

export default function App() {
    const [defaultCategoryDetails,setDefaultCategoryDetails] = useState({});

    useEffect(()=> {
        const defaultCategoryFetch = async () => {
            setDefaultCategoryDetails(await getSignleCategory())};
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
