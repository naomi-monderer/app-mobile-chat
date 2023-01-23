import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/Ionicons';
import AllRooms from '../screen/AllRooms'
import Profil from '../screen/Profil'
import Messages from '../screen/Messages'
import { View,Image,Text,StyleSheet,TouchableOpacity } from 'react-native';






const Tab = createBottomTabNavigator();

function TabBar() {
  
  const styles = StyleSheet.create({
    shadow:{
      shadowColor: '#7F5DF0',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.35,
      shadowRadius: 3.5,
      elevation: 5
      }
  })

  const screenOptions = {
    tabBarShowLabel: false,
    tabBarStyle:{
      display: 'flex',
      height:70,
      position: 'absolute',
      bottom: 20,
      left: 10,
      right: 10,
      elevation: 0,
      backgroundColor: '#000000',
      borderRadius: 25,
      height: 90, 
      ...styles.shadow
    },
    tabBarItemStyle:{
      paddingTop: 0,
      margin:5,
      borderRadius:10,
    }, 
  };


  return (
    <Tab.Navigator {...{ screenOptions}}>
      <Tab.Screen name="Messages" component={Messages} options={{ 
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center',}}>
            <Image
              source={require('../../assets/icons/message-icon.png')}
              resizeMode='contain '
              style={{
                width: 50,
                height: 50,
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

      <Tab.Screen name="Chuu rooms" component={AllRooms} options={{ 
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center', }}>
              <Image
                source={require('../../assets/icons/chuu-purpl.png')}
                resizeMode="contain"
                style={{
                  width: 50,
                  height: 50,
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
                width: 44,
                height: 44,
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