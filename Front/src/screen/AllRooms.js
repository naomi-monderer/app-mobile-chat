import PopUp from "../components/PopUp";
import { useState, useEffect } from "react";
import {
  Text,
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from "react-native";



const AllRooms = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleConfirm = () => {
    // Do something when the confirm button is pressed
    setModalVisible(false)
    console.log('wsh')
  };

  const handleCancel = () => {
    // Do something when the cancel button is pressed
    console.log('cancel')
    setModalVisible(false)
  };

  return (
    <View>
    <TouchableOpacity onPress={() => setModalVisible(true)}>
      <Text>Open Modal</Text>
    </TouchableOpacity>
    <PopUp visible={modalVisible} text="Are you sure you want to delete this item?" onConfirm={handleConfirm} onCancel={handleCancel} />
      <View style={styles.modalContainer}>
        <Text style={styles.modalText}>Are you sure you want to proceed?</Text>
        <View style={styles.divider} />
        <View style={styles.modalActionsContainer}>
          <TouchableOpacity style={styles.modalAction} onPress={() => setModalVisible(false)}>
            <Text style={styles.modalActionText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalAction} onPress={() => alert('Confirmed')}>
            <Text style={styles.modalActionText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
  </View>
);

};


export default AllRooms

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  innerContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10
  },
  divider: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray'
  },
  modalActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  actionButton: {
    padding: 10
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10
  },
});