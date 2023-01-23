import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import Screen Components
import HomeScreen from './src/screen/HomeScreen';
import ChatScreen from './src/screen/ChatScreen';
import Connexion from './src/screen/Connexion';
import LogoutButton from './src/components/LogoutButton';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}
        {/* <Stack.Screen name="HomeScreen" component={LogoutButton} /> */}
        {/* <Stack.Screen name="Connexion" component={Connexion} /> */}
        <Stack.Screen name="ChatScreen" component={ChatScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;