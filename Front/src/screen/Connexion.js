import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { API } from '../constant/constant';

// const baseUrl = "http://10.10.46.224:3000"


export default function Connexion() {
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')

	const isLoggedIn = () => {
		SecureStore.getItemAsync('token1').then((res) => {
			if(res) {
				console.log(res)
				console.log('Go to chat ----- NAVIGATION AU CHAT')
			}
		})
	}
	isLoggedIn();

	const connect = () => {
		axios.post(API + '/users/auth', {
			login: login,
			password: password
		})
		.then(function (response) {
			setLogin('');
			setPassword('');
			const token = response.data.token;
			const refresh = response.data.refresh;
			SecureStore.setItemAsync('token1', token).then(() => {
				SecureStore.setItemAsync('refreshtoken', refresh).then(() => {
					console.log(token)
					console.log('token is tokened')
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

	return (
		<View style={styles.margin}>
			<Text style={styles.title}>
				Sign in
			</Text>
			<View>
			<TextInput 
				style={styles.input}
				placeholder="login"
				onChangeText={login => setLogin(login)}
			/>
			<TextInput 
				style={styles.input}
				placeholder="password"
				onChangeText={password => setPassword(password)}
			/>
			<TouchableOpacity onPress={() => connect() } style={styles.button}>
				<Text>Login</Text>
			</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	margin: {
		marginTop: 190
	},
	title: {
		color: 'red',
	},
	input: {
		borderBottomColor: 'black',
		borderBottomWidth: 1,
	},
	button: {
		backgroundColor: 'yellow',
	}
})