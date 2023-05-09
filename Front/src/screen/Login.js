import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground} from "react-native";
import * as SecureStore from 'expo-secure-store';
import jwt_decode from "jwt-decode";
import { API } from '../constant/constant';
import ROUTES from '../constant/routes';

export default function Login({ navigation }) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadUser = async () => {
            const token = await SecureStore.getItemAsync('token1');
            const refreshToken = await SecureStore.getItemAsync('refreshtoken');
            if (token && refreshToken) {
                const decodedToken = jwt_decode(token);
                if (decodedToken.exp > Date.now() / 1000) {
                    setRooms(decodedToken.id_rooms);
                    navigation.navigate(ROUTES.HOME, { screen: rooms.length > 1 ? ROUTES.FEED : ROUTES.CHATROOMS });
                } else {
                    try {
                        const response = await axios.post(`${API}/users/refresh`, {
                            refreshToken: refreshToken
                        });
                        const newToken = response.data.token1;
                        const newRefreshToken = response.data.refreshtoken;
                        await SecureStore.setItemAsync('token1', newToken);
                        await SecureStore.setItemAsync('refreshtoken', newRefreshToken);
                        navigation.navigate(ROUTES.HOME, { screen: rooms.length > 1 ? ROUTES.FEED : ROUTES.CHATROOMS });
                    } catch (error) {
                        handleAxiosError(error);
                    }
                }
            }
        };
        loadUser();
    }, []);

    const handleAxiosError = (error) => {
        if (error.response) {
            console.log('error response data', error.response.data);
            console.log('error response status', error.response.status);
            console.log('error response headers', error.response.headers);
        } else if (error.request) {
            console.log('error request', error.request);
        } else {
            console.log('Error', error.message);
            alert('An error occurred. Please try again later.');
        }
    };

    const connect = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${API}/users/auth`, {
                login: login,
                password: password
            });
            const token = response.data.token;
            const refreshToken = response.data.refreshToken;
            await SecureStore.setItemAsync('token1', token);
            await SecureStore.setItemAsync('refreshtoken', refreshToken);
            const decodedToken = jwt_decode(token);
            setRooms(decodedToken.id_rooms);
            navigation.navigate(ROUTES.HOME, { screen: rooms.length > 1 ? ROUTES.FEED : ROUTES.CHATROOMS });
        } catch (error) {
			console.log('Error logging in:', error);
            handleAxiosError(error);
        } finally {
            setLoading(false);
            setLogin('');
            setPassword('');
        }
    };

	return (
  
		<ImageBackground
			source={require("../assets/connexion.png")}
			resizeMode="cover"
			style={{ 
				width: '100%', 
				height: '100%', 
				backgroundColor: '#C5AAFF',
			}}
		>

			<View style={styles.container}>
				<View style={styles.boxTitle}>
				<Text style={styles.title}>
					Sign in
				</Text>
				</View>
				<View style={styles.boxForm}>
					<Text style={styles.label}>
						Login
					</Text>
					<TextInput
						style={styles.input}
						onChangeText={login => setLogin(login)}
					/>
					<Text style={styles.label}>
						Password
					</Text>
					<TextInput
						style={styles.input}
						onChangeText={password => setPassword(password)}
						secureTextEntry={true}
					/>
					<TouchableOpacity
						onPress={() => connect()}
						style={styles.button}
					>
						<Text
							style={styles.buttonText}
						// onPress={() => navigation.navigate(ROUTES.HOME, { screen: rooms.length > 1 ? ROUTES.FEED : ROUTES.CHATROOMS })}
						>
							Login
						</Text>
					</TouchableOpacity>
					<Text
						style={styles.toRegister}
						onPress={() => navigation.navigate(ROUTES.REGISTER)}
					>
						New to Chuu ? Sign Up here !
					</Text>
				</View>
			</View>
		</ImageBackground>
		
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 52,
		alignItems: 'center'
	},
	boxTitle: {
		marginTop: 90,
	},
	boxForm: {
		marginTop: 60,

	},
	title: {
		fontSize: 40,
		fontWeight: '600',
		marginBottom: 15,
	},
	label: {
		marginTop: 15,
		fontSize: 15,
		fontWeight: '500',
	},
	input: {
		borderBottomColor: 'black',
		borderBottomWidth: 1,
		height: 40,
	},
	button: {
		marginTop: 20,
		backgroundColor: 'black',
		borderRadius: 12
	},
	buttonText: {
		color: '#C5AAFF',
		textAlign: 'center',
		padding: 15,
		fontWeight: '500',
		fontSize: 18,
	},
	toRegister: {
		marginTop: 20,
		fontWeight: '600',
		fontSize: 15,
	}
})