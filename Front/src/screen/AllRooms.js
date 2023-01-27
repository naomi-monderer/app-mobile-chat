import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import BlocRoom from '../components/BlocRoom';

const baseUrl = "http://10.10.65.62:3000"
// const baseUrl = "http://192.168.0.49:3000"
// const baseUrl = "http://localhost:3000"

export default function AllRooms() {
	const [underline, setUnderline] = useState(2)
	// const [callTab, setCallTab] = useState(1)
	const [rooms, setRooms] = useState([]);

	const underlined = (number) => {
		setUnderline(number)
		// setCallTab(number)
	}

	let uri = "/participants/rooms-list/:userId"
	if (underline === 2) uri = "/rooms"

	return (
		<>
			<View style={styles.tabs}>
				<TouchableOpacity onPress={() => underlined(1)}>
					<Text style={underline === 1 ? styles.selected : styles.notSelected}>My Chuu-Rooms</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => underlined(2)}>
					<Text style={underline === 2 ? styles.selected : styles.notSelected}>More Chuu-Rooms</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.container}>
				<BlocRoom />
			</View>
		</>
	)
}

const styles = StyleSheet.create({
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
		// justifyContent: 'space-between',
		// alignItems: 'center',
		// maxWidth: '75%'
	},
})
