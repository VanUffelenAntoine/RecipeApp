import {Button, Card, Text} from "react-native-paper";
import {ScrollView, View} from "react-native";
import React, {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {getMealById} from "../utils/MaelAPI";

export const RecipeDetails = ({route}) => {
    const {recipe} = route.params
    const [recipeFull, setRecipeFull] = useState({});
    const navigation = useNavigation();

    useEffect(() => {
        const fetchFullRecipe = async () => setRecipeFull(await getMealById(recipe.idMeal));
        fetchFullRecipe();
        navigation.setOptions({title : recipeFull.strMeal})
    },[recipe])

    return (<ScrollView>
        <Card mode={'outlined'} style={{margin: 10}}>
            <Card.Content>
                <Text variant={"bodyMedium"}>{recipeFull.strMealDescription}</Text>
                <Text variant={"titleSmall"}>Instructions: </Text>
                <Text variant={"bodySmall"}>{recipeFull.strInstructions}</Text>
            </Card.Content>
            <Card.Cover source={{uri: `${recipeFull.strMealThumb}`}}/>
        </Card>
    </ScrollView>)
}