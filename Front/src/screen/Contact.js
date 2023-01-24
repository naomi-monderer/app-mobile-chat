import React, { useState } from "react"
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native"
import ContactMenu from "../components/ContactMenu"

export default function Contact() {
	const [underline, setUnderline] = useState()
	const test = () => {
		
	}

	return (
		<View style={styles.background}>
			<View style={styles.tabs}>
				<TouchableOpacity onPress={() => test}>
					<Text style={styles.title}> Main Chuu </Text>
				</TouchableOpacity>
				<TouchableOpacity>
					<Text style={styles.title}>My Chuu-Rooms</Text>
				</TouchableOpacity>
			</View>
			<SafeAreaView>
				<ContactMenu />
			</SafeAreaView>
		</View>
	)
}

const styles = StyleSheet.create({
	background: {
		backgroundColor: '#080713'
	},
	tabs: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-evenly"
	},
	tab: {
		textDecorationLine: 'underline',
		color: '#C5AAFF',
	},
	title: {
		color: '#C5AAFF',
		fontSize: 20,
		fontWeight: '600',
		marginBottom: 50,
		marginLeft: 14,
		paddingTop: 20,
	}
})