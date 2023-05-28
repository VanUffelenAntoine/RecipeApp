import React from 'react';
import {getCategories} from "../utils/MaelAPI";
import {FlatList, Text, TouchableOpacity, View} from "react-native";
import {Card, Title, Button} from 'react-native-paper';
import {useNavigation} from "@react-navigation/native";
import {useEffect, useState} from "react";

const CategoryPreview = ({item}) => {
    const navigation = useNavigation();

    const handleCardPress = () => {
        navigation.navigate('CategoryDetails', {item});
    }

    return <TouchableOpacity onPress={handleCardPress}>
        <Card mode={'outlined'} style={{marginEnd: 10}}>
            <Card.Title title={item.strCategory}/>
        </Card>
    </TouchableOpacity>
}

const RenderCategory = ({item}) => {
    return <CategoryPreview item={item}/>;
};

export function Categories() {
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => setCategories(await getCategories());
        fetchCategories();
    }, []);
    console.log('------------------');
    console.log(categories)

    return (
        <View><FlatList
            data={categories}
            renderItem={RenderCategory}
            keyExtractor={(item) => item.idCategory}
        /></View>
    )
}