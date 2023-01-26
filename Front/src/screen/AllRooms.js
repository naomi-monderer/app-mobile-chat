import PopUp from "../components/PopUp";
import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,

} from "react-native";

const AllRooms = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleConfirm = () => {
    // Do something when the confirm button is pressed
    setModalVisible(false);
    console.log("wsh");
  };

  const handleCancel = () => {
    // Do something when the cancel button is pressed
    console.log("cancel");
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text>Open Modal</Text>
      </TouchableOpacity>
        <PopUp
          visible={modalVisible}
          text="Are you sure you want to delete this item?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          // style={styles.innerContainer}
        />
    </View>
  );
};

export default AllRooms;

const styles = StyleSheet.create({
 
 
});
