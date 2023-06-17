import {ScrollView} from "react-native";
import {Card, Text} from "react-native-paper";
import {AntDesign} from "@expo/vector-icons";

export const RecipeDetails = ({recipe,children}) => {
    const ingredients = [];
    const measures = [];

    for (let i = 1; i <= 20; i++) {
        const ingredientKey = `strIngredient${i}`;
        const measureKey = `strMeasure${i}`;

        if (recipe[ingredientKey] && recipe[measureKey]) {
            ingredients.push(recipe[ingredientKey]);
            measures.push(recipe[measureKey]);
        }
    }

    return <ScrollView>
        <Card mode={'outlined'} style={{margin: 10}}>
            <Card.Content>
                <Text variant={"titleLarge"}>{recipe.strMeal}</Text>
                {children}
                <Text variant={"titleSmall"}>Ingredients : </Text>
                {ingredients.map((ingredient,index) => {
                    return <Text key={index}><AntDesign name="right" size={10} />{`${ingredient} : ${measures[index]}`}</Text>
                })}
                <Text variant={"bodyMedium"}>{recipe.strMealDescription}</Text>
                <Text variant={"titleSmall"}>Instructions: </Text>
                <Text variant={"bodySmall"}>{recipe.strInstructions}</Text>
            </Card.Content>
            <Card.Cover source={{uri: `${recipe.strMealThumb}` }}/>
        </Card>
    </ScrollView>
}
