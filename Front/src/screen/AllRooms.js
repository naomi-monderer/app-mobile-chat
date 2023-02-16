import React, { useState, useEffect, useCallback } from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import BlocRoom from '../components/BlocRoom';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const baseUrl = "http://10.10.1.33:3000"
// const baseUrl = "http://192.168.0.49:3000"
// const baseUrl = "http://localhost:3000"

let arrayRooms = [];
let idRooms = [];
export default function AllRooms() {
	const [underline, setUnderline] = useState(2)
	const [rooms, setRooms] = useState([]);
	const [moreRooms, setMoreRooms] = useState([])
	const [unavailable, setUnavailable] = useState(false)

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

	useEffect(() => {
		console.log('hello')
		console.log(moreRooms)
		moreRooms.forEach((moreRoom) => {
			idRooms.push(moreRoom.id)
		})
	}, [moreRooms])

	const setNewRooms = (object)=>{
		arrayRooms.push(object)
		setMoreRooms(arrayRooms)
	}
	
	const deleteRoom = (id) => {
		arrayRooms = arrayRooms.filter(arrayRoom => arrayRoom.id !== id)
		idRooms = idRooms.filter(id_room => id_room !== id)
		setMoreRooms(moreRooms.filter(moreRoom => moreRoom.id !== id))
		setUnavailable(false)
	}

	const addRooms = () => {
		SecureStore.getItemAsync('token1').then((token) => {
			SecureStore.getItemAsync('refreshtoken').then((refresh) => {
				console.log(refresh)
				axios({
					method: 'post',
					url: `${baseUrl}/participants/rooms-list/add`,
					headers: {
						'Content-Type': 'application/json',
						token1: token,
						refreshtoken: refresh
					},          
					data: JSON.stringify({
						id: idRooms
					})
				}).then((response) => {
						console.log(response.data)
					})
					.catch(error => {
						console.log('catch')
						if (error.response.status === 417) {
							console.log('417')
							axios({
								method: 'post',
								url: `${baseUrl}/participants/rooms-list/add`,
								headers: {
									'Content-Type': 'application/json',
									token1: token,
									refreshtoken: error.response.data
								}, 
								data: JSON.stringify({
									id: idRooms
								})       
							}).then((response) => {
								console.log(response.data)
							})
							.catch(function (error) {
								console.log('error')
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
							})
						}
						else {
							console.log('refresh')
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
						}
					})
				})
			})
	}

	useEffect(() => {
		if(moreRooms.length >= 1) {
			rooms.forEach((room) => {
				moreRooms.forEach((moreRoom) => {
					if(room.id === moreRoom.id) {
						setUnavailable(true)
					}
				})
			});
		}
	}, [rooms, moreRooms])


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
							name={room.name}
							room={room}
							tab={underline}
							pressRoom={setNewRooms}
							specialClass={unavailable}
							touchable={true}
						/>
					)
					:
					<Text>No rooms.</Text>
				}
			</View>

			{
				moreRooms.length >= 1 &&
					<ScrollView 
						style={styles.test}
						// stickyHeaderIndices={[0]}
					>
						<View style={styles.help}>
							{
								moreRooms.map((moreRoom) => 
									<BlocRoom
										key={moreRoom.id}
										id={moreRoom.id}
										name={moreRoom.name}
										pressRoom={deleteRoom}
									/>
								)
							}
						</View>

						<TouchableOpacity onPress={() => addRooms()}>
							<Text>Add</Text>
						</TouchableOpacity>
					</ScrollView>
			}
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
		justifyContent: 'space-between',
		flexWrap: 'wrap',
		backgroundColor: '#080713',
	},
	test: {
		backgroundColor: 'red',
	},
	help: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	}
})
