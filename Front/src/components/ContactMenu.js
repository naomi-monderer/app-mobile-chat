import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";


export default function ContactMenu({contact, onPress}) {
	return (
		<View>
			<TouchableOpacity 
				style={styles.container}
				key={contact.id}
				onPress={onPress}
			>
				{/* Image */}
				<View
					style={styles.tinyIcon}
				>
					<Image
						style={styles.img}
						source={{uri: 'https://64.media.tumblr.com/8dbc1deb8d065c648579661798a5acff/2e4fda1ea8ca843d-83/s400x600/21daa16bfb4201749429aaf4b3b4a007920dca58.png'}}
						/>
				</View>
				{/* Name */}
				<View>
					<Text 
					style={styles.roomName}
					>
						{contact.name}
					</Text>
					{/* Message */}
					<View style={styles.msgContainer}>
						<Text 
						style={styles.message}
						numberOfLines={1}
						>
							{contact.content}
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		</View>
	)
}


const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#080713',
		width: "100%",
		borderBottomWidth: 0.5,
		borderBottomColor: "#FFFFFF",
	},
	tinyIcon: {
		width: 50,
		height: 50,
		margin: 20,
	},
	img: {
		width: '100%',
		height: '100%',
		resizeMode: 'contain',
		borderRadius: 50
	},
	roomName: {
		fontWeight: '600',
		fontSize: 18,
		color: 'white',
	},
	msgContainer: {
		width: 170,
	},
	message: {
		color: '#A9A9A9',
		maxWidth: '100%',
		marginTop: 7,
	}
})