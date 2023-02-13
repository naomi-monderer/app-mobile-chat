import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Register from './src/screen/RegisterScreen';
import TabBar from './src/navigation/TabBar';
import Messages from './src/screen/Messages';
import Connexion from './src/screen/Connexion';

// import Screen Components
import HomeScreen from './src/screen/HomeScreen';
import ChatScreen from './src/screen/ChatScreen';
import Connexion from './src/screen/Connexion';
import LogoutButton from './src/components/LogoutButton';

// const Tab = createBottomTabNavigator();
//  function HomeScreen() {
//   return (
//             <TabBar /> 
//   );
//  }

// function HomeScreen() {
//   return (
//     // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//     //   <Text>Home Screen</Text>
//     // </View>
//     <Tab.Navigator>
//       <Tab.Screen name="Connexion" component={Connexion} />
//     </Tab.Navigator>
//   );
// }
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AuthNavigator from './src/navigation/AuthNavigation';

const tabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} /> 
        <Stack.Screen name="ChatScreen"   component={ChatScreen} options ={{title:'nom room'}} />

        {/* <Stack.Screen name="HomeScreen" component={LogoutButton} /> */}

        
        {/* <Stack.Screen name='Register' component={Register} /> */}
        {/* <Stack.Screen name='Message' component={Messages} /> */}
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
        <Stack.Screen name="Connexion" component={Connexion} />
      </Stack.Navigator>
      <AuthNavigator />
    </NavigationContainer>
  );
}

export default App;
