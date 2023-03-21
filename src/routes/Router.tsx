import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HealthyNavigator from "./healthy-navigator";


const Stack = createNativeStackNavigator();

function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="HealthyNavigator" component={HealthyNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router