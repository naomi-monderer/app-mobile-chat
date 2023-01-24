import React, { useState } from "react"
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native"
import ContactMenu from "../components/ContactMenu"

export default function Contact() {
	const [underline, setUnderline] = useState(1)
	const [callTab, setCallTab] = useState(1)

	const underlined = (number) => {
		setUnderline(number)
		setCallTab(number)
	}

	return (
		<View style={styles.background}>
			<View style={styles.tabs}>
				<TouchableOpacity 
					onPress={() => underlined(1)}
					style={underline === 1 && styles.tab}
				>
					<Text style={styles.title}> Main Chuu </Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => underlined(2)}
					style={underline === 2 && styles.tab}
				>
					<Text style={styles.title}>My Chuu-Rooms</Text>
				</TouchableOpacity>
			</View>
			<SafeAreaView>
				<ContactMenu callTab = {callTab} />
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