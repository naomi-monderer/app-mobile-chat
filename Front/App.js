import * as React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabBar from './src/navigation/TabBar';
import AllRooms from './src/screen/AllRooms';

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
        <TabBar /> 
    </NavigationContainer>
  );
}


// const App =()=> {
//   return(
//     <NavigationContainer>
//       <TabBar/>
//     </NavigationContainer>
//   );
// }
export default App;