import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import TabBar from './src/navigation/TabBar';
// import Messages from './src/screen/Messages';
import AuthNavigator from './src/navigation/AuthNavigation';

const tabs = createBottomTabNavigator();

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <AuthNavigator />
    {/* pour la navigation/la navbar */}
    {/* <tabs.Navigator> */}
      {/* si connecté : l'accueil sera ses contacts */}
      {/* <tabs.Screen name='accueil' component={HomeScreen}/>
      <tabs.Screen name='register' component={Register}/>
      <tabs.Screen name='messages' component={Messages}/>
    </tabs.Navigator> */}
      {/* <Stack.Navigator> */}
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
        {/* <Stack.Screen name='Register' component={Register} /> */}
        {/* <Stack.Screen name='Message' component={Messages} /> */}
        {/* <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator> */}
    </NavigationContainer>
  );
}


export default App;