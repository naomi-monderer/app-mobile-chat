import React, { useEffect } from "react";
import { Button, View, Text } from "react-native";
import { NavigationContainer, TabActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AuthNavigator from "./src/navigation/AuthNavigation";
import axios from "axios";
import Api from "./src/Auth/Api";

const tabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function App() {
  useEffect(() => {
    const api = new Api();

    api.get({
      route: "/teeeest",
      success: (data) => {
        console.log("Test", data.data);
      },
    });
  }, []);

  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
}

export default App;
