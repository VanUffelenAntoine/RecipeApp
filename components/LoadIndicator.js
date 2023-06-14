import {View} from "react-native";
import AnimatedLoader from "react-native-animated-loader";
import {Text} from "react-native-paper";

export const LoadIndicator = (promiseInProgress) => {
    if (promiseInProgress){
        return <View>
            <AnimatedLoader
                visible={true}
                overlayColor="rgba(255,255,255,0.75)"
                speed={1}>
                <Text>Doing something...</Text>
            </AnimatedLoader>
        </View>
    }
}