import * as React from "react";
import axios from "axios";
// import * as SecureStore from 'expo-secure-store';
// import jwt_decode from "jwt-decode";

import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const Messages = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMessageIndex, setSelectedMessageIndex] = useState();
  const [messages, setMessages] = useState([{}]);
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [dateTime, setDateTime] = useState(
    new Date().toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
  );

  const fetchMessages = async () => {
    const client = axios.create({
      baseURL: "http://10.10.63.72:3000/",
    });
    try {
      const response = await client.get(`chat/messages`, {
        headers: {
          "Access-Control-Allow-Origin": "http://10.10.63.72:3000",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
      setMessages(response.data);
      console.log("my messsssszages", response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMessages();
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

  if (messages?.length > 0) {
    console.log("ok");
    messages.forEach((msg) => {
      let date = new Date(msg.created_at);
      formattedDate = new Date(msg.created_at).toLocaleTimeString("en-US", {
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
      {messages?.map((msg, index) => (
        <View style={styles.container} key={index}>

          <View style={styles.receivedMessage}>
            <TouchableOpacity onLongPress={() => handleLongPress(index)}>
              <Text style={{ margin: 15 }}>{msg.content}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.display}>
            <View>
              <Text style={styles.receivedHour}>{formattedDate}</Text>
            </View>

              {msg.reaction ? (
                <View style={{ position: 'absolute', bottom: 0, alignSelf: 'flex-start', paddingLeft:67 }}>
                  <Text style={{fontSize:25, marginLeft:80,  }}>{msg.reaction}</Text>
                </View>
              ) : null}
            <View style={styles.bottomModal}>
              {selectedMessageIndex === index && modalVisible ? (
                <TouchableOpacity style={styles.modalContainer}>
                  <TouchableOpacity onPress={() => handleReaction("💅🏽", index)}>
                    <Text style={{fontSize:20,}}>💅🏽</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleReaction("🫶", index)}>
                    <Text style={{fontSize:20,}}>🫶</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleReaction("🤮", index)}>
                    <Text style={{fontSize:20,}}>🤮</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ) : (
                <Text></Text>
              )}
            </View>
          </View>
        
        </View>
      ))}
    </>
  );
};

export default Messages;

const styles = StyleSheet.create({
  display: {
    flexDirection:'row',
  },

  sendMessage: {
    margin: 20,
    width: "40%",
    marginBottom: 0,
    alignSelf: "flex-end",
    backgroundColor: "#B2FFDF",
    borderRadius: 20,
  },

  container: {
    flex: 1,
  },

  receivedMessage: {
    width: "40%",
    margin: 20,
    marginBottom: 0,
    alignSelf: "flex-start",
    borderRadius: 20,
    backgroundColor: "#C5AAFF",
    position: "relative",
  },

  receivedHour: {
    alignSelf: "flex-start",
    marginLeft: 25,
    paddingTop: 0,
    fontSize: 10,
  },

  sendedHour: {
    alignSelf: "flex-start",
    marginLeft: 28,
    paddingTop: 0,
    fontSize: 10,
  },

  bottomModal: {
    flexDirection: "row",
    zIndex: 1000,
    width: "27%",
    alignSelf: "flex-start",
    // flexWrap: "wrap",
    // backgroundColor: "green",
    justifyContent: "space-between",
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
    marginLeft:79,
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
},

// reactionsContainer: {
//           backgroundColor: "green",
//     marginRight: 10,
//     width: "20%",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     borderRadius: 20,
//   },
});
