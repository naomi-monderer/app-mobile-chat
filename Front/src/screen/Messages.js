import * as React from "react";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import jwt_decode from 'jwt-decode'
import { API } from '../constant/constant';
import { useState, useEffect } from "react";
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
} from "react-native";




const Messages = (props) => {

	const [modalVisible, setModalVisible] = useState(false);
	const [selectedMessageIndex, setSelectedMessageIndex] = useState();
	const [messages, setMessages] = useState([]);
	const [decoded, setDecoded] = useState([]);
	const [selectedReaction, setSelectedReaction] = useState(null);
	const [dateTime, setDateTime] = useState(
		new Date().toLocaleString("en-US", {
			hour: "numeric",
			minute: "numeric",
			hour12: true,
		})
	);

	function getUserInfo(callback) {

		SecureStore.getItemAsync('token1').then((payload) => {
			payload = jwt_decode(payload);
			callback(payload);
		})

	}

	// props.idRoom ? `${API}/chat/get/` + props.idRoom : `${API}/chat/messages`


	function getMessages(callback) {

		SecureStore.getItemAsync('token1').then((rest) => {
			SecureStore.getItemAsync('refreshtoken').then((res) => {
				if (res) {
					var payload = jwt_decode(rest);
					console.log('payload',payload)
					console.log('idROom',props.idRoom)
					axios.get(`${API}/chat/get/${props.idRoom}`,
						{
							headers: {
								'Content-Type': 'application/json',
								token1: rest,
								refreshtoken: res
							}
						}).then(res => {
							// const data = res.data;
							callback(res.data);

							console.log('DATA-MESSAGES: ', res.data);
							
							// console.log('DATA-MESSAGES-0: ', );
							// res.data[0].login;
							// console.log('DATA-MESSAGES: ', data.data);
							// console.log('pl: ', payload)
						}).catch(error => {
							if(error.response) {
								console.log('error response data', error.response.data);
                				console.log('error response status', error.response.status);
                				console.log('error response headers', error.response.headers);
							} else if (error.request) {
								console.log('error request', error.request);
							}
							else {
								console.log('Error', error.message);
							}
						})
				}
			})
		})

	}
	useEffect(() => {

		getUserInfo(payload => {

			setDecoded(payload);
		})
		getMessages(data => {
			setMessages(data);
		})

	}, []);


	const handleLongPress = (index) => {
		setModalVisible(true);
		setSelectedMessageIndex(index);
	};

	const handleReaction = (reaction, index) => {
		const newMessages = [...messages];
		newMessages[index] = {
			...newMessages[index],
			reaction,
		};
		setMessages(newMessages);
		setSelectedReaction(reaction);
		setModalVisible(false);
	};

	const formattedDate = [];
	if (messages?.length > 0) {
		messages.forEach((msg) => {
			formattedDate[msg.id] = new Date(msg.created_at).toLocaleTimeString("en-US", {
				hour: "numeric",
				minute: "numeric",
				hour12: true,
			});
		});
	}


	return (
		<>
			<View>
				<Text style={styles.currentHour}>{dateTime}</Text>
			</View>
			{messages?.map((msg, index) => {

				return (
					<View style={styles.container} key={index}>
						{/* {console.log(decoded.login)}
						{console.log(msg.login)}
						{console.log('----------')} */}

						{isUser = decoded.login == msg.login}
						<TouchableOpacity style={isUser ? styles.sendedMessage : styles.receivedMessage} onLongPress={() => handleLongPress(index)}>
							<Text style={styles.content}>{msg.content}</Text>
						</TouchableOpacity>

						<View style={styles.display}>

							<View
								style={styles.contentSendedHours}
							>
								{isUser = decoded.login == msg.login}
								<Text style={isUser ? styles.sendedHour : styles.receivedHour}>{formattedDate[msg.id]}</Text>
							</View>

							{msg.reaction ? (
								<View style={{ position: 'absolute', bottom: 0, alignSelf: 'flex-start', paddingLeft: 67 }}>
									<Text style={{ fontSize: 25, marginLeft: 80, }}>{msg.reaction}</Text>
								</View>
							) : null}
							<View style={styles.bottomModal}>
								{selectedMessageIndex === index && modalVisible ? (
									<TouchableOpacity style={styles.modalContainer}>
										<TouchableOpacity onPress={() => handleReaction("💅🏽", index)}>
											<Text style={{ fontSize: 20, }}>💅🏽</Text>
										</TouchableOpacity>
										<TouchableOpacity onPress={() => handleReaction("🫶", index)}>
											<Text style={{ fontSize: 20, }}>🫶</Text>
										</TouchableOpacity>
										<TouchableOpacity onPress={() => handleReaction("🤮", index)}>
											<Text style={{ fontSize: 20, }}>🤮</Text>
										</TouchableOpacity>
									</TouchableOpacity>
								) : (
									<Text></Text>
								)}
							</View>
						</View>

					</View>

				)

			}

			)}
		</>
	);
};

export default Messages;

const styles = StyleSheet.create({
	display: {
		flexDirection: 'row',

	},
	contentSendedHours: {

	},
	sendedMessage: {
		margin: 10,
		width: 300,
		padding: 10,
		marginBottom: 0,
		alignSelf: "flex-end",
		backgroundColor: "#B2FFDF",
		borderRadius: 20,
	},

	container: {
		flex: 1
	},

	receivedMessage: {
		// height: 100,
		width: 300,
		marginBottom: 4,
		marginLeft: 10,
		alignSelf: "flex-start",
		borderRadius: 20,
		backgroundColor: "#C5AAFF",
		position: "relative",
		padding: 10
	},

	content: {
		padding: 1,
		// backgroundColor:'yellow'
	},

	receivedHour: {
		// alignSelf: "flex-start",
		marginLeft: 25,
		paddingTop: 0,
		fontSize: 10,
	},

	sendedHour: {
		alignSelf: "center",
		alignSelf: "flex-start",
		// alignContent:"",
		// display: "flex",
		// flexDirection:"row",
		// alignItems:"flex-end",
		color: "red",
		marginLeft: 28,
		paddingTop: 0,
		fontSize: 10,
		width: '100%',
		backgroundColor: 'blue'

	},

	bottomModal: {
		flexDirection: "row",
		zIndex: 1000,
		width: "27%",
		alignSelf: "flex-start",
		flexWrap: "wrap",
		// backgroundColor: "green",
		// justifyContent: "space-between",
	},

	currentHour: {
		alignSelf: "center",
		padding: 10,
		fontSize: 12,
	},

	modalContainer: {
		alignItems: "flex-end",
		width: "80%",
		backgroundColor: "white",
		marginLeft: 79,
		padding: 10,
		borderRadius: 10,
		flexDirection: "row",
	},

	reactionsContainer: {
		backgroundColor: "green",
		marginRight: 10,
		width: "20%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderRadius: 20,
	},
});
