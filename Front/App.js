import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './src/screen/RegisterScreen';
import TabBar from './src/navigation/TabBar';
import Messages from './src/screen/Messages';
import Connexion from './src/screen/Connexion';

// function HomeScreen() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Register" component={Register} />
//     </Tab.Navigator>
//   );
// }

function HomeScreen() {
  return (
    // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //   <Text>Home Screen</Text>
    // </View>
    <Tab.Navigator>
      <Tab.Screen name="Connexion" component={Connexion} />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator> */}
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
        {/* <Stack.Screen name='Register' component={Register} /> */}
        {/* <Stack.Screen name='Message' component={Messages} /> */}
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
        <Stack.Screen name="Connexion" component={Connexion} />
      {/* </Stack.Navigator> */}
    </NavigationContainer>
  );
}


export default App;