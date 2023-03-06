import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ImageBackground, SafeAreaView } from "react-native";
import * as SecureStore from 'expo-secure-store';
import ROUTES from '../constant/routes';
import jwt_decode from "jwt-decode";
import { API } from '../constant/constant';
// const baseUrl = "http://10.10.1.184:3000"
// const baseUrl = "http://192.168.0.49:3000"
// const baseUrl = "http://localhost:3000"

export default function Login({ navigation }) {
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [rooms, setRooms] = useState([])

	useEffect(() => {
		SecureStore.getItemAsync('token1').then((res) => {
			console.log(res)
			if (res) {
				const decoded = jwt_decode(res);
				setRooms(decoded.id_rooms)
				// navigation.navigate(ROUTES.HOME, {screen: ROUTES.CONTACT})
			} else {
				alert("No token found")
			}
		})
	}, [rooms])

	const connect = () => {
		if (login !== '' && password !== '') {
			axios.post(API + '/users/auth', {
				login: login,
				password: password
			})
				.then(function (response) {
					setLogin('');
					setPassword('');
					const token = response.data.token;
					const refresh = response.data.refresh;
					console.log(token);
					console.log(refresh);
					SecureStore.setItemAsync('token1', token).then(() => {
						SecureStore.setItemAsync('refreshtoken', refresh).then(() => {
							navigation.navigate(ROUTES.HOME, { screen: rooms.length > 1 ? ROUTES.FEED : ROUTES.CHATROOMS })
						})
					})
				})
				.catch(function (error) {
					if (error.response) {
						// The request was made and the server responded with a status code
						// that falls out of the range of 2xx
						console.log('error response data', error.response.data);
						console.log('error response status', error.response.status);
						console.log('error response headers', error.response.headers);
					} else if (error.request) {
						// The request was made but no response was received
						// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
						// http.ClientRequest in node.js
						console.log('error request', error.request);
					} else {
						// Something happened in setting up the request that triggered an Error
						console.log('Error', error.message);
					}
				});
		}
		else {
			alert('Please enter a valid login and password.')
		}
	}

	return (
		<ImageBackground
			source={require("../assets/connexion.png")}
			resizeMode="cover"
			style={{ width: '100%', height: '100%', backgroundColor: '#C5AAFF' }}
		>
			<View style={styles.container}>
				<Text style={styles.title}>
					Sign in
				</Text>
				<View>
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
		padding: 10,
		fontWeight: '500',
		fontSize: 15,
	},
	toRegister: {
		marginTop: 20,
		fontWeight: '600',
		fontSize: 15,
	}
})