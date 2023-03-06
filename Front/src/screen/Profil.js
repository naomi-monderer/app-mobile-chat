import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  LogoutButton  from '../components/LogoutButtonnnnn';

function Profil() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>profil</Text>
      <LogoutButton />
    </View>
  );
}


export default Profil;