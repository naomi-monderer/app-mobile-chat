import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import Avatar from "../components/Avatar";
import ActionList from "../components/ActionList";

const ProfilePage = ({
  handleModifyProfile,
  handleSignOut,
  handleDeleteAccount,
}) => {
  // const navigation = useNavigation();

  return (
    // <ScrollView style={styles.scroll}>
    <View>
      <View style={styles.container}>
        <Avatar
          source={require("../../assets/avatars/avatar_boucles.png")}
          size={100}
        />

        <TouchableOpacity style={styles.ListItem}>
          <View style={styles.listItemInnerContentView}>
            <Text style={styles.TextStyles}>My profile</Text>
          </View>
        </TouchableOpacity>
        <Text>Your hName</Text>
      </View>
        <ActionList
          handleModifyProfile={handleModifyProfile}
          handleSignOut={handleSignOut}
          handleDeleteAccount={handleDeleteAccount}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 26,
  },
});

export default ProfilePage;
