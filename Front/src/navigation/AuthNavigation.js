import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
// import {Login, Register} from '../screen';
import Login from '../screen/Login';
import Register from '../screen/Register';
import ROUTES from '../constant/routes';
import TabBar from './TabBar';
// import DrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator();

export default function AuthNavigator() {
	return (
		<Stack.Navigator screenOptions={{
			headerStyle: {
				backgroundColor: '#C5AAFF'
			}
		}} initialRouteName={ROUTES.LOGIN}>
			<Stack.Screen name={ROUTES.LOGIN} component={Login} />
			<Stack.Screen name={ROUTES.REGISTER} component={Register} />
			<Stack.Screen name={ROUTES.HOME} component={TabBar} options={{headerShown: false}} />
		</Stack.Navigator>
);
}
