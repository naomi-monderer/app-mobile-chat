import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import Avatar from "../components/Avatar";
import ActionList from "../components/ActionList";
import { getUserInfos, logOut } from "../api/auth";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import * as SecureStore from 'expo-secure-store';
import { API } from '../constant/constant';


const ProfilePage = ({   handleModifyProfile,
  handleDeleteAccount,}) => {
  const [userInfo, setUserInfo] = useState(null);
  const navigation = useNavigation();


  useEffect(() => {
    getUserInfos((data) => {
      console.log(data);
      setUserInfo(data);
    });
  }, []);

  console.log('type defonction', typeof getUserInfos());

  async function login(username, password) {
    try {
      
      const response = await axios.post(`${API}/users/auth`, {
        username: username,
        password: password,
      });
      const token = response.data.token;
      // Store the token in a secure location, such as AsyncStorage or SecureStore
    } catch (error) {
      console.error(error);
    }
  }
  SecureStore.getItemAsync('username').then(username => {
    console.log(username);
  });

  const handleSignOut = async () => {
    // await logOut(() => {
    //   navigation.navigate('Login');
    // });
    // const jwt = await SecureStore.getItemAsync('refreshtoken');
    // const decoded = jwt_decode(jwt);
    // console.log(decoded);
  }

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
            <Text style={styles.TextStyles}>Username: {userInfo?.username}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <ActionList
        handleModifyProfile={handleModifyProfile}
        logOut={getUserInfos}
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
