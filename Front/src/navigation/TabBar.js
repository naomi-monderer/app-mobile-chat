import * as React from 'react';
// import {View, Pressable, Dimensions, StyleSheet} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import AllRooms from '../screen/AllRooms'
import Profil from '../screen/Profil'
import Messages from '../screen/Messages'
import { View,Image,Text,StyleSheet,TouchableOpacity } from 'react-native';




// const {width} = Dimensions.get('window')

const Tab = createBottomTabNavigator();

function TabBar() {

  const screenOptions = {
    tabBarStyle:{
      height:70,
      position: 'absolute',
      bottom: 10,
      left: 10,
      right: 10,
      elevation: 0,
      backgroundColor: '#000000',
      borderRadius: 15,
      height: 90, 
    },
    tabBarItemStyle:{
      margin:5,
      borderRadius:10,
    }, 
  };

  const styles = StyleSheet.create({
    shadow:{
      shadowColor: '#7F5DF0',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation: 5
      }
  })

  return (
    <Tab.Navigator tabBarOptions={{showLabel: false}}  {...{ screenOptions}}>
      <Tab.Screen name="AllRooms" component={AllRooms} options={{ 
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center',}}>
            <Image
              source={require('../../assets/icons/message-icon.png')}
              resizeMode='contain '
              style={{
                width: 35,
                    height: 35,
              tintColor: focused ? '#B2FFDF' : '#ADADAD'
              }}
            />
            <Text style={{color: focused ? '#B2FFDF' : '#ADADAD', fontSize: 10}}>
              post
            </Text>
          </View>
        
          )
        }}  
      />

      <Tab.Screen name="Messages" component={Messages} options={{ 
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center', }}>
              <Image
                source={require('../../assets/icons/chuu-purpl.png')}
                resizeMode="contain"
                style={{
                  width: 35,
                  height: 35,
                tintColor: focused ? '#C5AAFF' : '#ADADAD'
                }}
              />
              <Text style={{color: focused ? '#C5AAFF' : '#ADADAD', fontSize: 10}}>
               rooms
              </Text>
          </View>
          )
        }} 
      />

      <Tab.Screen name="Profil" component={Profil}  options={{ 
          tabBarIcon: ({focused}) => (
          <View style={{alignItems: 'center', justifyContent: 'center', }}>
            <Image
              source={require('../../assets/icons/profil-icon.png')}
              resizeMode='contain '
              style={{
                width: 30,
                  height: 30,
              tintColor: focused ? '#FFE589' : '#ADADAD'
              }}
            />
            <Text style={{color: focused ? '#FFE589' : '#ADADAD', fontSize: 10}}>
              profil
            </Text>
          </View>
          )
        }}
      />
      
    </Tab.Navigator>
  );
}

export default TabBar;