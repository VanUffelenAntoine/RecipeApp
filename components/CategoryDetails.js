import {Button, Card, Modal, TextInput} from "react-native-paper";
import {Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {getMealsByCategory} from "../utils/MaelAPI";


export function CategoryDetails({route}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [amount, setAmount] = useState('');
    const {item} = route.params;

    const handleModalVisibility = () => {
        setModalVisible(!modalVisible);
    };

    const handleConfirm = async () => {
        const category = item.strCategory;
        const recipes = await getMealsByCategory(category);
        // Perform any action with the entered amount
        console.log('Amount:', amount);

        // Close the modal
        setModalVisible(false);
        setAmount('');
    };


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
        <Modal visible={modalVisible} animationType="slide" onDismiss={handleModalVisibility} >
                    <TextInput
                        placeholder="Enter Amount of recipes"
                        value={amount}
                        onChangeText={setAmount}
                        keyboardType="numeric"
                        style={{ borderWidth: 1, borderColor: 'gray', padding: 8, borderRadius: 4 }}
                    />

                    <Button mode={'contained'} title="Confirm" onPress={handleConfirm}>Confirm</Button>
        </Modal>
    </View>)
}