import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function BlocRoom({name, room, id, pressRoom, deletePress, specialClass, touchable, tb, disabled, moreRooms}) {

	const blocRoomPress = () => {
		// console.log('room id', room.id)
		pressRoom({'id':room.id, 'name':name})
	}

	const deleteRoom = () => {
		deletePress(id)
	}

	return (
		//ajouter dans le press qu'on peut aller dans les messages de la room également si c'est notre room
			<TouchableOpacity 
				style={styles.container}
				onPress={() => {deletePress ? deleteRoom() : blocRoomPress()} }
				// disabled={}
			>
				{/* Image */}
				<View style={styles.tinyIcon}>
					<Image
					style={styles.img}
					source={{uri: 'https://64.media.tumblr.com/6b9e50e7237cf04fd44b6f56ce75e848/04f19f3b5d21afac-b3/s400x600/0ca003534bb919ad9c1b6c94181a23aa1aa70077.pnj'}}
					/>
				</View>
				<Text style={styles.name}>{name}</Text>
			</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		zIndex: 3,
		elevation: 3,
	},
	tinyIcon: {
		width: 85,
		height: 85,
		margin: 15,
	},
	img: {
		width: '100%',
		height: '100%',
		resizeMode: 'contain',
		borderRadius: 50
	},
	notImg: {
		width: '100%',
		height: '100%',
		resizeMode: 'contain',
		borderRadius: 50,
		tintColor: 'gray',
	},
	name: {
		textTransform: 'uppercase',
		fontSize: 15,
		fontWeight: '500',
		color: 'white'
	},
	notName: {
		textTransform: 'uppercase',
		fontSize: 15,
		fontWeight: '500',
		color: 'grey'
	}
})