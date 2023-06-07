import {Linking, View} from "react-native";
import {Text, Title} from "react-native-paper";

const URL = ({url, children}) => {
    return <Text style={{color:'blue'}} onPress={() => Linking.openURL(url)}>{children}</Text>
}

export const HomeScreen = () => {

    return <View style={{flex: 1 , justifyContent: "center", alignContent: "center",textAlign: "center"}}>
        <Title style={{textAlign:"center"}}>Recipe App</Title>
        <Text style={{textAlign:"center"}}>React native app using <URL url={'https://www.themealdb.com'}>MealDB</URL></Text>

    </View>
}