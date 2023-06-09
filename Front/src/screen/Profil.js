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
import UpdateUser from "./UpdateUser";
import Login from "./Login";

function Profil() {
  const navigation = useNavigation();
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

    SecureStore.getItemAsync("refreshtoken")
      .then((refresh) => {
        setRefreshToken(refresh);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(userData, "...hurihurehirher");

  const handleSignOut = async () => {
    try {
      SecureStore.getItemAsync("token1").then((res) => {
        if (res) {
          SecureStore.deleteItemAsync("token1").then(() => {
            SecureStore.deleteItemAsync("refreshtoken");
          });
          navigation.navigate("Login");
          console.log("sucessfully loged out");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

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


const handleModifyProfile = () => {
  navigation.navigate("UpdateUser");
};

  return (
    <View style={styles.background}>
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

      <ActionList
      actions={[
    { id: '1', title: 'Modify Profile', handleAction: handleModifyProfile },
    { id: '2', title: 'Log Out', handleAction: handleSignOut },
  ]}
     handleModifyProfile={handleModifyProfile}
      logOut={handleSignOut}
      // handleDeleteAccount={handleDeleteAccount}
      />

      {/* <LogoutButton /> */}
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
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FFFFFF",
  },
  actionListItemText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});


export default Profil;
