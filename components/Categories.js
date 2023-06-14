import React from 'react';

import {FlatList, TouchableOpacity, View} from "react-native";
import {Card} from 'react-native-paper';
import {useNavigation} from "@react-navigation/native";
import {useEffect, useState} from "react";
import {getCategories} from "../utils/MealAPI";
import {trackPromise, usePromiseTracker} from "react-promise-tracker";
import {LoadIndicator} from "./LoadIndicator";


const CategoryPreview = ({item}) => {
    const navigation = useNavigation();

    const handleCardPress = () => {
        navigation.navigate('CategoryDetails', {item});
    }

    return <TouchableOpacity onPress={handleCardPress}>
        <Card mode={'outlined'} style={{margin: 5}}>
            <Card.Title title={item.strCategory}/>
        </Card>
    </TouchableOpacity>
}

const RenderCategory = ({item}) => {
    return <CategoryPreview item={item}/>;
};

export function Categories() {
    const [categories, setCategories] = useState(null);
    const {promiseInProgress} = usePromiseTracker();

    useEffect(() => {
        const fetchCategories = async () => setCategories(await getCategories());
        trackPromise(
            fetchCategories()
        );
    }, []);


    if (promiseInProgress){
        return <LoadIndicator/>
    }

    return (
        <View>
            <FlatList
            data={categories}
            renderItem={RenderCategory}
            keyExtractor={(item) => item.idCategory}
        /></View>
    )
}