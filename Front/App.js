import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UpdateUser from './src/screen/UpdateUser';
import Connexion from './src/screen/Connexion';
import LogoutButton from './src/components/LogoutButton';

function HomeScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="UpdateUser" component={UpdateUser} />
      {/* <Tab.Screen name="logout" component={LogoutButton} /> */}
      {/* <Tab.Screen name="login" component={Connexion} /> */}
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="UpdateUser" component={UpdateUser} />
        {/* <Stack.Screen name="logout" component={LogoutButton} /> */}
        {/* <Stack.Screen name="UpdateUser" component={Connexion} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;