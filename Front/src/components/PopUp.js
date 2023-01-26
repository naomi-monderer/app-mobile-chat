import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";

const PopUp = ({ text, onConfirm, onCancel }) => (
  <View style={styles.modalContainer}>
    <Text>{text}</Text>
    <View style={styles.divider} />
    <TouchableOpacity onPress={onConfirm}>
      <Text>Confirm</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onCancel}>
      <Text>Cancel</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  modalContainer: {
    
    marginTop:198,
    position: 'absolute',
    alignSelf: 'center', 
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    width: "50%",
    height: "30%",
  },
  divider: {
    borderBottomColor: "#737373",
    width: "90%",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  text:{
    fontSize: 30,
    marginTop:12,
    marginBottom:23
  }
});

export default PopUp;
