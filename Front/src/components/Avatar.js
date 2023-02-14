import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const Avatar = ({ source, size }) => {
  const [avatarSource, setAvatarSource] = useState(source);
  const [pickerVisible, setPickerVisible] = useState(false);

  const handleAvatarPress = () => {
    setPickerVisible(true);
  };

  const handlePickerClose = () => {
    setPickerVisible(false);
  };

  const handlePickerSelect = (selectedAvatar) => {
    setAvatarSource(selectedAvatar);
    setPickerVisible(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={handleAvatarPress}>
        <View style={[styles.avatarContainer, { width: size, height: size }]}>
          <Image
            source={avatarSource}
            style={[styles.avatar, { width: size, height: size }]}
          />
        </View>
      </TouchableOpacity>
      <Modal visible={pickerVisible} animationType="slide">
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerHeader}>Select an avatar</Text>
          <Picker
            selectedValue={avatarSource}
            onValueChange={(itemValue) => handlePickerSelect(itemValue)}
          >
            <Picker.Item
              label="Avatar 1"
              value={require("../../assets/avatars/avatar_blonde.png")}
            />
             
            
            <Picker.Item
              label="Avatar 2"
              value={require("../../assets/avatars/avatar_boucles.png")}
            />
            <Picker.Item
              label="Avatar 3"
              value={require("../../assets/avatars/avatar_casque.png")}
            />
          </Picker>
          <TouchableOpacity
            style={styles.pickerCloseButton}
            onPress={handlePickerClose}
          >
            <Text style={styles.pickerCloseButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>

    
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    borderRadius: 50,
    backgroundColor: "pink",
    overflow: "hidden",
    marginTop: 30,
    
  },
  avatar: {
    borderRadius: 50,
   
  },
  pickerContainer: {
    padding: 120,
  },
  pickerHeader: {
    fontSize: 20,
    marginBottom: 20,
  },
  pickerCloseButton: {
    padding: 10,
    backgroundColor: "lightgray",
    borderRadius: 5,
    alignSelf: "center",
  },
  avatarPreview: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  avatarPreviewLabel: {
    fontSize: 18,
  }
});

export default Avatar;
