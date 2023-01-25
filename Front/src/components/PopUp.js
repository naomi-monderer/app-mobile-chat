import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'



const PopUp = ({ text, onConfirm, onCancel }) => (
  <View>
    <Text>{text}</Text>
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
    
  divider: {
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth
  }
})

export default PopUp