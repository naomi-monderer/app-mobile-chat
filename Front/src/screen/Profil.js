import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity , ImageBackground} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ROUTES from '../constant/routes';
import Avatar from "../components/Avatar";
import ActionList from "../components/ActionList";
import LogoutButton from "../components/LogoutButton";
import axios from "axios";
import jwt_decode from "jwt-decode";
import * as SecureStore from "expo-secure-store";
import { API } from "../constant/constant";
import UpdateUser from "./UpdateUser";
import Login from "./Login";

function Profil({navigation}) {

  const [userData, setUserData] = useState({});
  const [avatar_url, setAvatar_url] = useState({});
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  useEffect(() => {
    SecureStore.getItemAsync("token1")
      .then((token) => {
        const decodedToken = jwt_decode(token);
        setUserData(decodedToken);
        const url = `${API}/users/details/${decodedToken?.id}`;

        // axios
        //   .get(url, {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   })
        //   .then((response) => {
        //     console.log('data', response.data);
        //     setUserData('setUserData', response.data);
        //   })
        //   .catch((error) => {
        //     console.log('error axios', error);
        //   });
      })
      .catch((error) => {
        console.log('catch error', error);
      });

    SecureStore.getItemAsync("refreshtoken")
      .then((refresh) => {
        setRefreshToken(refresh);
      })
      .catch((error) => {
        console.log('refreshtoken error',error);
      });
  }, []);

  console.log('userData spreadOperator', userData, "...hurihurehirher");

  const updateUserAvatar = async (userId, avatarUrl, token, refreshToken) => {
    try {
      const response = await axios({
        method: "patch",
        url: `${API}/users/${userId}/avatar`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          token1: token,
          refreshtoken: refreshToken,
        },
        data: JSON.stringify({ avatarUrl }),
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeAvatar = async () => {
    console.log(avatar_url, "avatar url");
    if (avatar_url) {
      const newAvatar = await updateUserAvatar(
        userData.id,
        avatar_url,
        token,
        refreshToken
      );
      setUserData({
        ...userData,
        avatar_url: newAvatar.avatar_url,
      });
      setAvatar_url(null);
    }
  };

  return (
   
    <View style={styles.background}>
        <ImageBackground
          source={require('../assets/gradientProfile.png')} 
          style={{width: '100%',  borderBottomWidth: 0.5,
          borderBottomColor: "#FFFFFF"}}
        >
      <View style={styles.container}>
        <TouchableOpacity onPress={handleChangeAvatar}>
          <Avatar
            source={
              userData?.avatar_url
                ? { uri: userData.avatar_url }
                : require("../../assets/avatars/avatar_boucles.png")
            }
            size={100}
            avatar_url={userData.avatar_url}
          />
        </TouchableOpacity>

        <View style={styles.actionListContainer}>
          <TouchableOpacity style={styles.ListItem}>
            <View style={styles.listItemInnerContentView}>
              {userData && (
                <>
                  <Text style={styles.textStyles}>Login: {userData.login}</Text>
                  <Text style={styles.textStyles}>Email: {userData.email}</Text>
                  <Text style={styles.textStyles}>Rooms: {userData.id_rooms}</Text>
                  
                </>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
      </ImageBackground>
      <View >
        <TouchableOpacity style={styles.actionListItem} onPress={() => navigation.navigate(ROUTES.UPDATEPROFILE)} >
          <Text style={styles.actionList}> Modify profile </Text>
        </TouchableOpacity> 
       <LogoutButton navigation={navigation}/>
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#080713",
  },
  container: {
    alignItems: "center",
    padding: 26,
    // backgroundColor:"red"
  },
  listItem: {
    width: "100%",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FFFFFF",
  },
  listItemInnerContentView: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textStyles: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  actionListContainer: {
    marginTop: 20,
  },
  actionListItem: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#FFFFFF",
    
  },
  actionListItemText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  actionList:{
    color: "#FFFFFF",
    padding: 20,
    backgroundColor: '#080713',
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#FFFFFF",
    fontSize: 20,
    
  }
});

export default Profil;