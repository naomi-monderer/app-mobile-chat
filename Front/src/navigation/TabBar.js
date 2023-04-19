import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import ROUTES from '../constant/routes';
import Contact from '../screen/Contact'
import AllRooms from '../screen/AllRooms'
import ChatScreen from'../screen/ChatScreen'
import Profil from '../screen/Profil'
import Messages from '../screen/Messages'
import { View,Image,Text,StyleSheet } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ContactStack = () => {

	return (
		<Stack.Navigator>
			<Stack.Screen 
				name={ROUTES.CONTACT} 
				component={Contact} 
				options={{
					headerStyle: {
						backgroundColor: '#C5AAFF',
					  },
					headerTintColor: 'white'}
			}
			/>
			<Stack.Screen 
				name={ROUTES.MESSAGES} 
				component={ChatScreen} 
				options={ 
						({route}) => ({title: route.params?.room_name, 
						headerTintColor: 'white',
						headerStyle: { backgroundColor: '#C5AAFF' },
						headerBackTitleVisible: false,
						headerShadowVisible: false, // applied here

						})} 
			/>
		</Stack.Navigator>

);
}

const ChatRoomStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen

				name = {ROUTES.CHATROOMS}
				component = {AllRooms}
				options={{
					headerStyle: {backgroundColor: '#C5AAFF'},
					headerTintColor: 'white'}
			}
			/>
		</Stack.Navigator>
	)
}

const ProfilStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen

				name = {ROUTES.PROFILE}
				component = {Profil}
				options={{
					headerStyle: {backgroundColor: '#C5AAFF'},
					headerTintColor: 'white'}
			}
			/>
		</Stack.Navigator>
	)

}
export default function TabBar() {
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

	const screenOptions = {
		tabBarShowLabel: false,
		tabBarStyle:{
			height:70,
			position: 'absolute',
			// bottom: 10,
			// left: 10,
			// right: 10,
			elevation: 0,
			backgroundColor: '#000000',
			// borderRadius: 15,
			height: 90, 
			...styles.shadow
		},
		tabBarItemStyle:{
			margin:5,
			borderRadius:10,
		}, 
	};

	return (
		<Tab.Navigator {...{screenOptions}} >
			<Tab.Screen name={ROUTES.CHATROOMS} component={ChatRoomStack} options={{ 
					tabBarIcon: ({focused}) => (
						<View style={{alignItems: 'center', justifyContent: 'center',}}>
						<Image
							source={require('../../assets/icons/chuu-purpl.png')}
							resizeMode='contain'
							style={{
								width: 35,
								height: 35,
								tintColor: focused ? '#B2FFDF' : '#ADADAD'
							}}
						/>
						<Text style={{color: focused ? '#B2FFDF' : '#ADADAD', fontSize: 10}}>
							rooms
						</Text>
					</View>
					),
					headerShown:false
				}}  
			/>

			<Tab.Screen name={ROUTES.CONTACT} component={ContactStack} options={{ 
					tabBarIcon: ({focused}) => (
						<View style={{alignItems: 'center', justifyContent: 'center', }}>
							<Image
								source={require('../../assets/icons/message-icon.png')}
								resizeMode="contain"
								style={{
									width: 35,
									height: 35,
									tintColor: focused ? '#C5AAFF' : '#ADADAD'
								}}
							/>
							<Text style={{color: focused ? '#C5AAFF' : '#ADADAD', fontSize: 10}}>
							message
							</Text>
					</View>
					),
					headerShown:false
				}} 
			/>

			<Tab.Screen name={ROUTES.PROFILE} component={ProfilStack}  options={{ 
					tabBarIcon: ({focused}) => (
					<View style={{alignItems: 'center', justifyContent: 'center', }}>
						<Image
							source={require('../../assets/icons/profil-icon.png')}
							resizeMode='contain'
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
					),
					headerShown:false
				}}
			/>

		</Tab.Navigator>
	);
}
