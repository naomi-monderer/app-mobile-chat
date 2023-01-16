import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AllRooms from '../screen/AllRooms'
import Profil from '../screen/Profil'
import Messages from '../screen/Messages'


const Tab = createBottomTabNavigator();

function TabBar() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="AllRooms" component={AllRooms} />
      <Tab.Screen name="Profil" component={Profil} />
      <Tab.Screen name="Messages" component={Messages} />
    </Tab.Navigator>
  );
}

export default TabBar;