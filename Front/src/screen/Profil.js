import React from "react";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import Avatar from "../components/Avatar";
import ActionList from "../components/ActionList";
import LogoutButton from "../components/LogoutButton";
import axios from "axios";
import jwt_decode from "jwt-decode";
import * as SecureStore from "expo-secure-store";

import useUserData from "../api/useUserData";


function Profil() {
  
  const navigation = useNavigation();
  const [token, setToken] = useState(null);

  useEffect(() => {
    SecureStore.getItemAsync('token1').then(setToken).catch(console.log);
  }, []);

  const userDatId = useUserData(token);
  const userData = jwt_decode(token);

  console.log(userData);


  const handleSignOut = async () => {
    try {
      SecureStore.getItemAsync('token1').then((res) => {
        if (res) {
          SecureStore.deleteItemAsync('token1').then(() => {
            SecureStore.deleteItemAsync('refreshtoken')
          })
          navigation.navigate('UpdateUser')
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.backgroung}>
      <View style={styles.container}>
        <Avatar
          source={require("../../assets/avatars/avatar_boucles.png")}
          size={100}
        />

        <TouchableOpacity style={styles.ListItem}>
          <View style={styles.listItemInnerContentView}>
            {userData && (
              <>
                <Text style={styles.TextStyles}>Login: {userData.login}</Text>
                <Text style={styles.TextStyles}>Email: {userData.email}</Text>
                <Text style={styles.TextStyles}>
                  Rooms: {userData.id_rooms}
                </Text>
              </>
            )}
          </View>
        </TouchableOpacity>
      </View>

      <ActionList
        // handleModifyProfile={()=> navigation.navigate('UpdateUser')}
        // logOut={handleSignOut}
        // handleDeleteAccount={handleDeleteAccount}
      />

      <LogoutButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 26,
  },
  backgroung: {
    // backgroundColor:"#080713",
  },
});

export default Profil;
