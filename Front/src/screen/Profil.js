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
// import { getUserInfos, logOut } from "../api/auth";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import * as SecureStore from 'expo-secure-store';
import { API } from '../constant/constant';


const ProfilePage = ({   handleModifyProfile,
  handleDeleteAccount,}) => {
  const [userInfo, setUserInfo] = useState(null);
  const navigation = useNavigation();

  function getUserInfo(callback) {

		SecureStore.getItemAsync('token1').then((payload) => {
			payload = jwt_decode(payload);
      console.log(payload)
			callback(payload);
		})

	}

  useEffect(() => {
    getUserInfo((payload) => {
      console.log(payload, 'data de profil info');
      setUserInfo(payload);
    });
  }, [ getUserInfo]);

  console.log(userInfo, 'user info');


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
            <Text style={styles.TextStyles}>My profile</Text>
            <Text style={styles.TextStyles}>Username: {userInfo?.username}</Text>
          </View>
        </TouchableOpacity>
      </View>
    
      <ActionList
        // handleModifyProfile={()=> navigation.navigate('UpdateUser')}
        logOut={handleSignOut}
        handleDeleteAccount={handleDeleteAccount}
      />
  
      {/* <LogoutButton /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 26,
  },
  backgroung:{
    // backgroundColor:"#080713",
  }
});

export default ProfilePage;
