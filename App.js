import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Categories} from "./components/Categories";
import {CategoryDetails} from "./components/CategoryDetails";
import {Recipes} from "./components/Recipes";

const Stack = createStackNavigator();

export default function App() {


  return (
      <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen name="Categories" component={Categories} />
              <Stack.Screen name="CategoryDetails" component={CategoryDetails} />

          </Stack.Navigator>
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
