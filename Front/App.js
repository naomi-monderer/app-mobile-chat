import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Register from './src/screen/RegisterScreen';
import TabBar from './src/navigation/TabBar';
import Messages from './src/screen/Messages';

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

const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} /> 
         <Stack.Screen name="ChatScreen"   component={ChatScreen} options ={{title:'nom room'}} />

        {/* <Stack.Screen name="HomeScreen" component={LogoutButton} /> */}
        {/* <Stack.Screen name="Connexion" component={Connexion} /> */}
        
        {/* <Stack.Screen name='Register' component={Register} /> */}
        {/* <Stack.Screen name='Message' component={Messages} /> */}

       
      </Stack.Navigator>
  
    </NavigationContainer>
  );
}


export default App;