import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native'



const PopUp = ({ text, onConfirm, onCancel }) => (
  <View style={styles.modalContainer}>
    <Text >{text}</Text>
    <View style={styles.divider} />
    <TouchableOpacity onPress={onConfirm}>
      <Text>Confirm</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onCancel}>
      <Text>Cancel</Text>
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
    modalContainer: {
        // flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        width: '50%',
        height: '50%'
      },
  divider: {
    borderBottomColor: '#737373',
    width: '90%',
    borderBottomWidth: StyleSheet.hairlineWidth
  }
})

export default PopUp