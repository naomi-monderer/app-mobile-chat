import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import ROUTES from '../constant/routes';
import Contact from '../screen/Contact'
import AllRooms from '../screen/AllRooms'
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
				options={{headerShown:false}}	
			/>
			<Stack.Screen 
				name={ROUTES.MESSAGES} 
				component={Messages} 
				options={({route}) => ({title: route.params?.room_name})} 
			/>
		</Stack.Navigator>
);
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
			
			bottom: 20,
			left: 20,
			right: 20,
			elevation: 0,
			backgroundColor: '#000000',
			borderRadius: 15,
			height: 90, 
			...styles.shadow
		},
		tabBarItemStyle:{
			paddingTop:20,
			margin:5,
			borderRadius:10,
		}, 
	};

	return (
		<Tab.Navigator {...{screenOptions}} >
			<Tab.Screen name={ROUTES.CHATROOMS} component={AllRooms} options={{ 
					tabBarIcon: ({focused}) => (
						<View style={{alignItems: 'center', justifyContent: 'center',}}>
						<Image
							source={require('../../assets/icons/chuu-purpl.png')}
							resizeMode='contain'
							style={{
								width: 42,
								height: 42,
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

			<Tab.Screen name={ROUTES.FEED} component={ContactStack} options={{ 
					tabBarIcon: ({focused}) => (
						<View style={{alignItems: 'center', justifyContent: 'center', }}>
							<Image
								source={require('../../assets/icons/message-icon.png')}
								resizeMode="contain"
								style={{
									width: 45,
									height: 45,
									tintColor: focused ? '#C5AAFF' : '#ADADAD'
								}}
							/>
							<Text style={{color: focused ? '#C5AAFF' : '#ADADAD', fontSize: 10}}>
							rooms
							</Text>
					</View>
					),
					headerShown:false
				}} 
			/>

			<Tab.Screen name={ROUTES.PROFILE} component={Profil}  options={{ 
					tabBarIcon: ({focused}) => (
					<View style={{alignItems: 'center', justifyContent: 'center', }}>
						<Image
							source={require('../../assets/icons/profil-icon.png')}
							resizeMode='contain'
							style={{
								width: 40,
								height: 40,
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
