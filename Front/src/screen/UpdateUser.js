import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity,SafeAreaView, StyleSheet, ImageBackground } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { API } from '../constant/constant';
import jwt_decode from "jwt-decode";

const UpdateUser = () => {

    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [userInfo, setUserInfo] = useState({});
    
        useEffect(() => {
            const getToken = async () => {
                try {

                    const jwt = await SecureStore.getItemAsync('refreshtoken');
                    const decoded = jwt_decode(jwt);
                    setUserInfo(decoded);
                    setEmail(decoded.email)
                    setLogin(decoded.login)

                } catch (error) {
                    console.log(error);
                }
            }
            getToken();
        }, []);

    const handleSubmit = () => {

		SecureStore.getItemAsync('token1').then((rest) => {
            SecureStore.getItemAsync('refreshtoken').then((res) => {
                if(res) {

                    var decoded = jwt_decode(res);
                    const userId = decoded.id;

                    if(password != passwordConfirm){
                       return alert('passwords are not the same')
                    }

                    axios({
                        method: 'post',
                        url:`${API}/users/update`,
                        headers: {
                            'Content-Type' : 'application/json',
                            token1: rest,
                            refreshtoken: res
                        },
                        data: JSON.stringify({
                            id: userId,
                            login: login,
                            password: password,
                            confPassword: passwordConfirm,
                            email: email
                        }),
                    })
                .then(response => {
                    console.log('response',response);
                    // Show success message
                })
                .catch(error => {
                    if (error.response) {
                        alert(error.response.data.message)
                        // alert(error.response.data)
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log('error response message', error.response.message)
                        console.log('error response data', error.response.data);
                        console.log('error response status', error.response.status);
                        console.log('error response headers', error.response.headers);
                        console.log('console log error response ',error.response.headers)
                    } else if (error.request) {
                        alert(error.response.data.error)
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log('error request', error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        alert(error.response.data.message)
                        console.log('Error', error.message);
                        // alert(error.message)
                    }
                });
            }

            }) 
        })
    }

    return (
        <View>
            <TextInput
                placeholder="login"
                value={login}
                onChangeText={text => setLogin(text)}
            />
            <TextInput
                placeholder="email"
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                placeholder="password"
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry={true}
            />
            <TextInput
                placeholder="passwordConfirm"
                value={passwordConfirm}
                onChangeText={text => setPasswordConfirm(text)}
                secureTextEntry={true}
            />
            <TouchableOpacity onPress={handleSubmit}>
                <Text>Update</Text>
            </TouchableOpacity>
        </View>
    );

}
export default UpdateUser;