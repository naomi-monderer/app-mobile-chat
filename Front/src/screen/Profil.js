import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Avatar from "../components/Avatar";
import ActionList from "../components/ActionList";
import LogoutButton from "../components/LogoutButton";
import axios from "axios";
import jwt_decode from "jwt-decode";
import * as SecureStore from "expo-secure-store";
import { API } from "../constant/constant";

function Profil() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    SecureStore.getItemAsync("token1")
      .then((token) => {
        const decodedToken = jwt_decode(token);
        setUserData(decodedToken);
        const url = `${API}/users/details/${decodedToken?.id}`;
        
        axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
            console.log(response.data);
            setUserData(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSignOut = async () => {
    try {
      SecureStore.getItemAsync("token1").then((res) => {
        if (res) {
          SecureStore.deleteItemAsync("token1").then(() => {
            SecureStore.deleteItemAsync("refreshtoken");
          });
          navigation.navigate("UpdateUser");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Avatar
          source={require("../../assets/avatars/avatar_boucles.png")}
          size={100}
        />

        <TouchableOpacity style={styles.ListItem}>
          <View style={styles.listItemInnerContentView}>
            {userData && (
              <>
                <Text style={styles.textStyles}>Login: {userData.login}</Text>
                <Text style={styles.textStyles}>Email: {userData.email}</Text>
                <Text style={styles.textStyles}>
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
  background: {
    // backgroundColor:"#080713",
  },
  textStyles: {
    // define your text styles here
  },
});

export default Profil;
