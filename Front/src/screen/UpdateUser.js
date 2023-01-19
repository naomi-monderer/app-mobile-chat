import React, { useState } from 'react';
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
    const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");

    const handleSubmit = () => {
        console.log('email:',email);
        console.log('login:',login);
        console.log('password:',password);
        console.log('passwordConfirm:',passwordConfirm);
        

		SecureStore.getItemAsync('token1').then((rest) => {
            SecureStore.getItemAsync('refreshtoken').then((res) => {
                if(res) {
                    // console.log(res)
                    var decoded = jwt_decode(res);
                    // console.log(decoded)
                    const userId = decoded.id;
                    console.log(decoded)
                    
                    const tata = SecureStore.getItemAsync('token1')
                    const id = '40';
                    // console.log('token',rest)
                    // console.log('refresh', res)
                    const token = rest;
                    // console.log('PAYLOD',rest)
                    const data = [userId,login,password, email];
                    // const config = {
                    //     headers: {
                    //             token1: `${rest}`,
                    //         },
                    // };
                    // const config = {
                    //     headers: {
                    //        Authorization: "Bearer " + res
                    //     }
                    //  }
                    // const config = {
                    //     headers: {
                    //         'Authorization': `Bearer ${rest}`
                    //     }
                    // };
                    // console.log('config : ',config)
                    // axios.get(`${API}/users/details/${userId}`,config )
                    //     .then(response => {
                    //         console.log('no homo',response.data);
                    //     })
                    //     .catch(error => {
                    //         console.log(error);
                    //     });
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
                    // axios.post(`${API}/users/update`,{
                        // method: 'post',
                        // url: `${API}/users/update`,
                        // // token1: `${rest}`,
                        // // refreshtoken: `${res}`,
                        // // headers: {
                        // //     token1: `${rest}`,
                        // //     refreshtoken: `${res}`
                        // // },
                        // headers: {
                        //     token1: `${rest}`,
                        // },
                        // // headers: {
                        // //     token1: `${rest}`,
                        // //     refreshtoken: `${res}`
                        // // },
                    //     data: data,
                    // })
                .then(response => {
                    console.log('response',response);
                    // Show success message
                })
                .catch(error => {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log('error response data', error.response.data);
                        console.log('error response status', error.response.status);
                        console.log('error response headers', error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log('error request', error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
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