import {Button, Card, Modal, TextInput, Title} from "react-native-paper";
import {Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";



export function CategoryDetails({route}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [amount, setAmount] = useState('');
    const {item} = route.params;

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({title: item.strCategory})
    }, [item])

    const handleModalVisibility = () => {
        setModalVisible(!modalVisible);
    };

    const handleConfirm =  () => {
        const category = item.strCategory;

        navigation.navigate('Recipes', {screen: 'RecipesList', params: {category, amount}});
        setModalVisible(false);
        setAmount('');
    };

    console.log(JSON.stringify(item));
    console.log(JSON.stringify(item) === '{}');

    if (JSON.stringify(item) === '{}') {
            return <View style={{flex: 1 , justifyContent: "center", alignContent: "center",textAlign: "center"}}>
                <Title style={{textAlign: 'center'}}>Please select a category first</Title>
                <Button onPress={() => navigation.navigate('Categories')}>Tap here to choose one!</Button>
            </View>
    }

    return (<View>
        <Card mode={'outlined'} style={{margin: 10}}>
            <Card.Title title={item.strCategory}/>
            <Card.Content>
                <Text variant={"bodyMedium"}>{item.strCategoryDescription}</Text>
            </Card.Content>
            <Card.Cover source={{uri: `${item.strCategoryThumb}`}}/>
            <Card.Actions>
                <TouchableOpacity onPress={handleModalVisibility}>
                    <Button>Recipes</Button>
                </TouchableOpacity>
            </Card.Actions>
        </Card>
        <Modal visible={modalVisible} animationType="slide" onDismiss={handleModalVisibility}>
            <View style={{width: '80%', alignSelf: "center"}}>
                <TextInput
                    placeholder="Enter Amount of recipes"
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="numeric"
                    style={{borderWidth: 1, borderColor: 'gray', borderRadius: 4, marginVertical: 5}}
                />

                <Button mode={'contained'} title="Confirm" onPress={handleConfirm}>Confirm</Button>
            </View>
        </Modal>
    </View>)
}