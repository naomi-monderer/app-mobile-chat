import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './src/screen/RegisterScreen';
import TabBar from './src/navigation/TabBar';
import AllRooms from './src/screen/AllRooms';

function HomeScreen() {
  return (
    // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //   <Text>Home Screen</Text>
    // </View>
    <Tab.Navigator>
      <Tab.Screen name="Register" component={Register} />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
        <Stack.Screen name='Register' component={Register} />
      </Stack.Navigator>
        {/* <TabBar />  */}
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