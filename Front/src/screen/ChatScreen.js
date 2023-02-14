import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, TextInput, Text, Button, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import InputText from '../components/InputText';
import Messages from './Messages';

export default function ChatScreen({ navigation, route }, props) {

	console.log("ID_ROOM ?", route.params?.id_room)
	console.log("ID_ROOM ", route.params.id_room)
	// const route = useRoute();

	useEffect(() => {
		console.log(route)
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

	return (

		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			enabled
			keyboardVerticalOffset={85}
		>
			<ScrollView style={{ position: 'relative', flex: 1 }}>
				<Messages idRoom={route.params.id_room} />

			</ScrollView>

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
