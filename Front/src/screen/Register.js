import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,SafeAreaView, StyleSheet, ImageBackground } from 'react-native';
import axios from 'axios';
import ROUTES from '../constant/routes';
import { API } from '../constant/constant';

const Register = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");

	const handleSubmit = () => {
		if (password !== passwordConfirm) {
			alert('Passwords do not match');
			return;
		}

        if (passwordRegex.test(password)) {
            console.log("Valid password");
            axios.post(`${API}/users/inscription`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },          
                login: login,
                password: password,
                email: email
            })
            .then(response => {
                console.log('response', response);
                if(response){
                    alert("Thanks for your subscription, you can sign in!")
                }
                
            })
            .catch(error => {
                if(error.response.data){
                    alert(error.response.data.error);
                }
                console.log('error', error.response.data);
            }); 
        } else {
        alert("The password must contain at least 8 characters and at least one lower case letter, one upper case letter and one number.");
        }
    }

    const styles = StyleSheet.create({
        container: {
            marginTop: 40,
        },
        input: {
            padding: 10,
            marginLeft:75,
            marginRight:70,
            textAlign:'center',
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            borderBottomStyle: 'solid'
        },
        label: {
            padding:10,
            marginLeft:70,
            textAlign:'left',
            fontSize: 16,
            lineHeight:19,
            fontWeight:'500',
            color:'#000000',
        },
        title: {
            padding:20,
            textAlign: 'center',
            fontWeight:'600',
            fontSize:40,
            lineHeight:46,
            color:'#000000',
        },
        button: {
            marginTop:30,
            backgroundColor: '#000000',
            padding: 10,
            margin:70,
            borderRadius: 10,
            alignItems: 'center',
        },
        buttonText: {
            color: '#C5AAFF',
            textAlign: 'center',
            padding: 5,
            fontWeight: '500',
            fontSize: 18,
        },
    });

    return (
        // <View style={styles.background}>
                <ImageBackground
                source={require('../assets/inscription.png')} 
                resizeMode="cover"
                style={{width: '100%',
                        height: '100%',
                        backgroundColor: '#C5AAFF'
                    }}
                >
                <Text style={styles.title} >Sign Up</Text>
                <View style={styles.container}>
                    <Text style={styles.label}>Login:</Text>
                    <TextInput
                        style={styles.input}
                        value={login}
                        onChangeText={text => setLogin(text)}
                    />

					<Text style={styles.label}>Email:</Text>
					<TextInput
						style={styles.input}
						value={email}
						onChangeText={text => setEmail(text)}
					/>

					<Text style={styles.label}>Password:</Text>
					<TextInput
						style={styles.input}
						value={password}
						onChangeText={text => setPassword(text)}
						secureTextEntry={true}
					/>

                    <Text style={styles.label}>Confirm password:</Text>
                    <TextInput
                        style={styles.input}
                        value={passwordConfirm}
                        onChangeText={text => setPasswordConfirm(text)}
                        secureTextEntry={true}
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}
                    onPress={() => navigation.navigate(ROUTES.LOGIN)}
                    >
                        Register
                    </Text>
                </TouchableOpacity>
            </ImageBackground>
        // </View>

	);

}

export default Register;
