import React, { useState, useEffect } from "react"
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native"
import ContactMenu from "../components/ContactMenu"
import ROUTES from '../constant/routes';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
// import Messages from '../screen/Messages'

// const baseUrl = "http://10.10.20.167:3000"
// const baseUrl = "http://192.168.0.49:3000"
const baseUrl = "http://localhost:3000"

export default function Contact({navigation}) {
	const [underline, setUnderline] = useState(1)
	const [contacts, setContacts] = useState([]);

	const underlined = (number) => {
		setUnderline(number)
	}

	let uri = "/rooms/generalroom"
	if (underline === 2) uri = "/rooms/contact"

	useEffect(() => {

		SecureStore.getItemAsync('token1').then((token) => {
			SecureStore.getItemAsync('refreshtoken').then((refresh) => {
				axios({
						method: 'get',
						url:`${baseUrl + uri}`,
						headers: {
							'Content-Type' : 'application/json',
							token1: token,
							refreshtoken: refresh
						}
					}).then((response) => {
						setContacts(response.data)
						
					})
					.catch(error => {
						if (error.response.status === 417) {
							axios({
								method: 'get',
								url:`${baseUrl + uri}`,
								headers: {
									'Content-Type' : 'application/json',
									token1: token,
									refreshtoken: error.response.data
								}
							}).then((response) => {
								setContacts(response.data)
								console.log('contact: ',response.data);
							})
							.catch(error => console.log(error))
						}
						else {
							console.log(error)
						}
					}
					)
				})
			})
		}, [underline]);


		useEffect(()=>{
			
			// axios pour delete en base for real 

		});




	return (
		<SafeAreaView style={styles.background}>
			<View style={styles.tabs}>
				<TouchableOpacity onPress={() => underlined(1)}>
					<Text style={underline === 1 ? styles.selected : styles.notSelected}> Main chuu </Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => underlined(2)}>
					<Text style={underline === 2 ? styles.selected : styles.notSelected}>My chuu </Text>
				</TouchableOpacity>
			</View>
			<View>
			{
				contacts.length > 0 ?
				contacts.map((contact) => 
					<ContactMenu 
						key={contact.id}
						contact={contact}
						onPress={() => navigation.navigate(ROUTES.MESSAGES, {id_room: contact.id, room_name : contact.name})}
					/>
				)
				:
				<View style={styles.container2}>
					<Text style={styles.text}>
						You are not subscribed to any rooms.
					</Text>
					<TouchableOpacity style={styles.cta}>
							<Text style={styles.textCta}> Get a room </Text>
					</TouchableOpacity>
				</View>
			}
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	background: {
		flex:1,
		backgroundColor: '#080713',
		marginTop: 50
	},
	tabs: {
		flexDirection: "row",
		justifyContent: "space-evenly",
	},
	selected: {
		textDecorationLine: 'underline',
		color: '#C5AAFF',
		fontSize: 20,
		fontWeight: '600',
		marginBottom: 50,
		marginLeft: 14,
		paddingTop: 20,
	},
	notSelected: {
		color: '#C5AAFF',
		fontSize: 20,
		fontWeight: '600',
		marginBottom: 50,
		marginLeft: 14,
		paddingTop: 20,
	},
	container2: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		color: 'white',
	},
	cta: {
		marginTop: 15,
	},
	textCta: {
		color: 'white',
		padding: 5,
		backgroundColor: '#C5AAFF',
	}
})