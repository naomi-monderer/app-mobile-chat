import React, { useEffect, useState, useRef } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, TextInput, Text, Button, StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, SafeAreaView, ImageBackground } from 'react-native';
import InputText from '../components/InputText';
import Messages from './Messages';
import { io } from 'socket.io-client';

export default function ChatScreen({ navigation, route }, props) {

	useEffect(() => {

		const socket = io("http://localhost:3000");
		socket.emit('joinIn', route.params.id_room)

		socket.on('newMessage', message => console.log("cool", message));

		console.log("ChatScreen, id_room: ", route.params?.id_room)
		navigation.getParent().setOptions({ tabBarStyle: { display: 'none' } });
		return () => {
			navigation.getParent().setOptions({
				tabBarStyle: {
					height: 70,
					position: 'absolute',
					bottom: 10,
					left: 10,
					right: 10,
					elevation: 0,
					backgroundColor: '#000000',
					borderRadius: 15,
					height: 90,
					...styles.shadow
				}
			});
		}


	}, [])

	const scrollViewRef = useRef();

	return (

		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			enabled
			keyboardVerticalOffset={85}
		>
			<ImageBackground
				source={require('../assets/chuu-chat.png')}
				style={{ width: '100%', height: '100%' }}
			>
				<ScrollView
					ref={scrollViewRef}
					onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
					style={{ position: 'relative', flex: 1 }}>
					<Messages style={{ height: '40%' }} idRoom={route.params.id_room} />
				</ScrollView>
			</ImageBackground>
			<TouchableWithoutFeedback onPress={() => {
				Keyboard.dismiss();
			}}>
				<InputText
					idRoom={route.params.id_room}
					// idRoom = {id_room}

					//4. je recupère via le props de mon parent mon attribu onChangeText et je lui passe le contenu de l'input  
					onChangeText={props.text}
				/>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 3,
		justifyContent: 'flex-end',
		backgroundColor: '#080713',
	},
})

