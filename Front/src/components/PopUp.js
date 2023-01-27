import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";

const PopUp = ({ text, onConfirm, onCancel }) => (
  <View style={styles.modalContainer}>
    <Text style={styles.text}>{text}</Text>
    <View style={styles.divider} />
    <TouchableOpacity onPress={onConfirm}>
      <Text style={[styles.button, { color: "#373737" }]}>Confirm</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onCancel}>
      <Text style={styles.button}> Cancel </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  modalContainer: {
    marginTop: 198,
    alignSelf: "center",
    width: "70%",
    backgroundColor: "#ADADAD",
    borderRadius: 25,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  divider: {
    borderBottomColor: "#737373",
    marginBottom: 19,
    width: "100%",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  text: {
    padding: 12,
    fontSize: 16,
    color: "white",
    marginTop: 12,
    marginBottom: 23,
  },
  button: {
    borderRadius: 20,
    borderColor: "white",
    elevation: 2,
    color: "white",
    margin: 10,
    fontSize: 16,
    borderWidth: 1,
    padding: 10,
  },
});

export default PopUp;
