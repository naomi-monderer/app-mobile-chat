import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { API } from '../constant/constant';
import jwt_decode from "jwt-decode";

function Profil() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    SecureStore.getItemAsync('token1')
      .then(token => {
        const decoded = jwt_decode(token);
      
        setUserData(decoded)
        console.log(userData,'ljneirhfiqlrj');
        const url = `${API}/users/details/${userData?.id}`;

        axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then(response => {
            console.log(response.data);
            setUserData(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile</Text>
      {userData && (
        <>
          <Text>Login: {userData.login}</Text>
          <Text>Email: {userData.email}</Text>
          <Text>Rooms: {userData.id_rooms}</Text>
        </>
      )}
    </View>
  );
}

export default Profil;
