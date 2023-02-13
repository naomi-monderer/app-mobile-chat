import React, { useState, useEffect, useCallback } from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import BlocRoom from '../components/BlocRoom';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const baseUrl = "http://10.10.20.120:3000"
// const baseUrl = "http://192.168.0.49:3000"
// const baseUrl = "http://localhost:3000"

let arrayRooms = [];
export default function AllRooms() {
	const [underline, setUnderline] = useState(2)
	const [rooms, setRooms] = useState([]);
	const [moreRooms, setMoreRooms] = useState([])

	const underlined = (number) => {
		setUnderline(number)
	}

	let uri = "/participants/rooms-list"
	if (underline === 2) uri = "/rooms"

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
						setRooms(response.data)
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
								setRooms(response.data)
							})
							.catch(error => console.log(error))
						}
						else {
							console.log(error)
						}
					})
				})
			})
		}, [underline]);

		const essai = (idRoom)=>{
			arrayRooms.push(idRoom)
			setMoreRooms(arrayRooms)
		}
		console.log('moreRooms', moreRooms)

	return (
		<View style={styles.bg}>
			<View style={styles.tabs}>
				<TouchableOpacity onPress={() => underlined(1)}>
					<Text style={underline === 1 ? styles.selected : styles.notSelected}>My Chuu-Rooms</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => underlined(2)}>
					<Text style={underline === 2 ? styles.selected : styles.notSelected}>More Chuu-Rooms</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.container}>
				{
					rooms.length >= 1 ?
					rooms.map((room) =>
						<BlocRoom 
							key={room.id}
							room={room}
							tab={underline}
							essai={essai}
						/>
					)
					:
					<Text>No rooms.</Text>
				}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	bg: {
		flex: 1,
		backgroundColor: '#080713'
	},
	tabs: {
		justifyContent: 'space-evenly',
		flexDirection: 'row',
		backgroundColor: '#080713',
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
	container: {
		flexDirection: 'row',
		backgroundColor: 'red',
		justifyContent: 'space-between',
		flexWrap: 'wrap',
		backgroundColor: '#080713',
	},
})
