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
                    }
                });
            }

            }) 
        })
    }

    const styles = StyleSheet.create({
        background: {
            backgroundColor: '#080713',
            width: '100%',
            height: '100%',
        },
        title: {
            padding:20,
            textAlign: 'center',
            fontWeight:'600',
            fontSize:40,
            lineHeight:46,
            color:'black',
        },
        container: {
            marginTop: 40,
        },   
        containerInput: {
            flexDirection: 'row',
            width: '100%',
            padding:'5%'
        },    
        input: {
            alignContent:'center',
            flex:5,
            fontSize:13,
            paddingLeft: 50,
            color:'black',
        },
        label: {
            justifyContent:'flex-start',
            marginBottom: 10,
            fontSize: 13,
            lineHeight:19,
            fontWeight:'500',
            color:'black',
        },
        button: {
            marginTop:100,
            backgroundColor: '#C5AAFF',
            padding: 10,
            margin:30,
            borderRadius: 10,
            alignItems: 'center',

        }
    })

    return (
        <View style={styles.background} >
        <ImageBackground
			source={require("../assets/connexion.png")}
			resizeMode="cover"
			style={{ 
				width: '100%', 
				height: '100%', 
				backgroundColor: '#C5AAFF',
			}}
		>
            {/* <Text style={styles.title} >Edit your profile</Text> */}

            <View style={styles.container}>

                <View style={styles.containerInput}>
                    <Text style={styles.label}>Login:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="login"
                        value={login}
                        onChangeText={text => setLogin(text)}
                    />
                </View>
                <View
                    style={{
                        borderBottomColor: 'white',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                />

            <View style={styles.containerInput}>
                <Text style={styles.label}>Email:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
            </View>
            <View
                style={{
                    borderBottomColor: 'white',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }}
            />
            
            <Text></Text>
            
            <View style={styles.containerInput}>
            <Text style={styles.label}>Password:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={true}
                />
            </View>
            <View
                style={{
                    borderBottomColor: 'white',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }}
            />

            <View style={styles.containerInput}>
            <Text style={styles.label}>Password Cofirm:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="passwordConfirm"
                    value={passwordConfirm}
                    onChangeText={text => setPasswordConfirm(text)}
                    secureTextEntry={true}
                />
            </View>

            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text
                style={{color : 'black'}}
                >Update</Text>
            </TouchableOpacity>
            </ImageBackground>
        </View>
    );

}
export default UpdateUser;