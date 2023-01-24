import * as React from "react";
import axios from "axios";
// import * as SecureStore from 'expo-secure-store';
// import jwt_decode from "jwt-decode";

import { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  SafeAreaView,
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
      baseURL: "http://10.10.57.156:3000/",
    });
    try {
      const response = await client.get(`chat/messages`, {
        headers: {
          "Access-Control-Allow-Origin": "http://10.10.57.156:3000",
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
    // newMessages[index].reaction = reaction;
    setMessages(newMessages);
    setSelectedReaction(reaction);
    setModalVisible(false);
  };

  if (messages?.length > 0) {
    console.log("ok");
    return (
      <>
        {messages?.map((msg, index) => (
          <View style={styles.container} key={index}>
            <SafeAreaView>
              <View style={styles.receivedMessage}>
                <TouchableOpacity
                  onLongPress={() =>handleLongPress(index)}
                >
                  <Text style={{ margin: 15 }}>{msg.content}</Text>
                </TouchableOpacity>
              </View>

                

              <View style={styles.bottomModal} >
                {selectedMessageIndex === index && modalVisible ? (
                    <TouchableOpacity>
                        <TouchableOpacity onPress={() => handleReaction("💅🏽", index)}>
                        <Text>💅🏽</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleReaction("🫶", index)}>
                        <Text>🫶</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleReaction("🤮", index)}>
                        <Text>🤮</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                    
                ) : (
                  <Text></Text>
                )}

                {msg.reaction ? (
                  <View>
                    <Text style={{ marginLeft: 35 }}>{msg.reaction}</Text>
                  </View>
                ) : null}
              </View>

              <View>
                <Text style={styles.currentHour}>{dateTime}</Text>
              </View>
            </SafeAreaView>
          </View>
        ))}
      </>
    );
  }
};

export default Messages;

const styles = StyleSheet.create({
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
    alignSelf: "flex-end",
    marginRight: 28,
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
    width: "45%",
    flexWrap: "nowrap",
    justifyContent: "space-between",
  },

  currentHour: {
    alignSelf: "center",
    padding: 10,
    fontSize: 12,
  },

  modalContainer: {
    position: "absolute",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
  },

  reactionsContainer: {
    marginRight: 10,
    width: "20%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
  },
});
