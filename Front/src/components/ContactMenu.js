import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from "react-native";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6Implbm5pZSIsImlhdCI6MTY3Mzk1NDE4NiwidHlwZSI6ImF1dGh0b2tlbiIsImVtYWlsIjoiamVubmllQGJsYWNrcGluay5jb20iLCJpZCI6IjIiLCJpZF9yb2xlIjoyLCJpZF9yb29tcyI6WyIyIiwiMSIsIjQiXSwiZXhwIjoxNjc2NTQ2MTg2fQ.xjWO6okUAzG2G7E7nXZ6y-SMRIAwjCzt_8DSEzU7buw'

const refreshtoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjczOTU0MzA3fQ.aubpMIY3JKSU-Jmo_2Grrt6p7TrUYcfqk_4hVP7mVX4'

const baseUrl = "http://localhost:3000/rooms/contact"

const config = {
    headers: { token1: `${token}`,
	refreshtoken: `${refreshtoken}`}
};


export default function ContactMenu() {
	const [contacts, setContacts] = useState([]);

	useEffect(() => {
		axios.get(
			baseUrl,
			config
			).then((response) => {
				setContacts(response.data)
			})
			.catch(error => console.log(error));
		}, []);

	return (
		<View>
		{contacts.map((contact) => 
			<View 
				style={styles.container}
				key={contact.id}
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
			</View>
			)
		}
		</View>
	)
}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#080713'
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
	},
})