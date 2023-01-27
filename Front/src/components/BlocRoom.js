import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function BlocRoom() {
	return (
		<View style={styles.line}>
			<View style={styles.container}>
				{/* Image */}
				<View style={styles.tinyIcon}>
					<Image
					style={styles.img}
					source={{uri: 'https://64.media.tumblr.com/6b9e50e7237cf04fd44b6f56ce75e848/04f19f3b5d21afac-b3/s400x600/0ca003534bb919ad9c1b6c94181a23aa1aa70077.pnj'}}
					/>
				</View>
				<Text style={styles.name}>blocRoom</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	line: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		flexWrap: 'wrap',
		backgroundColor: '#080713',
	},
	container: {
		alignItems: 'center'
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
	name: {
		textTransform: 'uppercase',
		fontSize: 15,
		fontWeight: '500',
		color: 'white'
	}
})