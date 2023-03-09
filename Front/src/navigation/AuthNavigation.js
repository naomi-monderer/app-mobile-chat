import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { createStackNavigator } from '@react-navigation/stack';
// import {Login, Register} from '../screen';
import Login from '../screen/Login';
import Register from '../screen/Register';
import Profil from '../screen/Profil';
// import Home from '../screen/Home';
// import ChatScreen from '../screen/ChatScreen';
// import AllRooms from '../screen/AllRooms';
import ROUTES from '../constant/routes';
import TabBar from './TabBar';
// import DrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator();

export default function AuthNavigator() {
    const [loggedIn, setLoggedIn] = React.useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const signedIn = await SecureStore.getItemAsync('token1');
            if (signedIn != null) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        };

        checkAuth();
    }, []);

    if (loggedIn === null) {
        return null;
    }
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#C5AAFF',
                },
            }}
            initialRouteName={loggedIn ? ROUTES.HOME : ROUTES.LOGIN}>
            <Stack.Screen
                name={ROUTES.HOME}
                component={TabBar}
                options={{ headerShown: false }}
            />
            <Stack.Screen name={ROUTES.LOGIN} component={Login} />
            <Stack.Screen name={ROUTES.PROFILE} component={Profil} />
            <Stack.Screen name={ROUTES.REGISTER} component={Register} />
        </Stack.Navigator>
    );
}
