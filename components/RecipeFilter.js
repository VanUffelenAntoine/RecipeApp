import {useCategoryContext} from "../contexts/CategoryContext";
import React, {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {Button, Card, TextInput} from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import {TouchableOpacity} from "react-native";

export const RecipeFilter = ({inputAmount, setInputAmount ,category}) => {
    const categories = useCategoryContext();
    const [showDropDown, setShowDropDown] = useState(false);
    const [dropdownCat, setDropdownCat] = useState(category.strCategory);

    const navigation = useNavigation();
    const dropdDownList = categories.map((cat) => {
        return {label: cat.strCategory, value: cat.strCategory}
    });

    useEffect(() => {
        if (category !== dropdownCat){
            setDropdownCat(category);
        }
    },[category])

    return <Card mode={'outlined'} style={{margin: 10}}>
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
    </Card>
}