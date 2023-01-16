import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,SafeAreaView, StyleSheet, ImageBackground } from 'react-native';
import axios from 'axios';
import { API } from '../constant/constant';

const Register = () => {
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");

    const image = {uri: '../'}

    // this.state = {
    //     fieldValue: '',
    //     errorMessage: ''
    // };

//       handleChange = (text) => {
//     this.setState({ fieldValue: text });
//     if (!text) {
//       this.setState({ errorMessage: 'This field is required' });
//     } else {
//       this.setState({ errorMessage: '' });
//     }   
//   }

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
        background: {
            backgroundColor: '#C5AAFF'
        },
        container: {
            marginTop: 40,
        },
        input: {
            // flex:1,
            textAlign:'center',
            // flex: 1,
            // height: 40,
            // margin: 25,
            // borderWidth: 1,
            padding: 10,
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            // borderColor: '#645682',
            borderBottomStyle: 'solid'
        },
        label: {
            textAlign:'center',
            // flex:2,
            fontSize: 16,
            lineHeight:19,
            fontWeight:'500',
            color:'#000000',

        },
        title: {
            padding:20,
            textAlign: 'center',
            // flex:2,
            fontWeight:'600',
            fontSize:40,
            lineHeight:46,
            color:'#000000',
        }
    });

    return (
        
        <View style={styles.background}>
            <SafeAreaView>
                <ImageBackground
                source={require('../asset/connexion.png')} 
                style={{width: '100%', height: '100%'}}
                >
                <Text style={styles.title} >Sign Up</Text>
                <View style={styles.container}>
                    <Text style={styles.label}>Login:</Text>
                    <TextInput
                        style={styles.input}
                        // placeholder="John Do"
                        value={login}
                        onChangeText={text => setLogin(text)}
                    />

                    <Text style={styles.label}>Email:</Text>
                    <TextInput
                        style={styles.input}
                        // placeholder="John.do@mail.com"
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />

                    <Text style={styles.label}>Password:</Text>
                    <TextInput
                        style={styles.input}
                        // placeholder="Password"
                        value={password}
                        onChangeText={text => setPassword(text)}
                        secureTextEntry={true}
                    />

                    <Text style={styles.label}>Confirm password:</Text>
                    <TextInput
                        style={styles.input}
                        // placeholder="Confirm Password"
                        value={passwordConfirm}
                        onChangeText={text => setPasswordConfirm(text)}
                        secureTextEntry={true}
                    />
                </View>

                
                <TouchableOpacity onPress={handleSubmit}>
                    <Text>Submit</Text>
                </TouchableOpacity>
            </ImageBackground>

            </SafeAreaView>
        </View>

    );

}

export default Register;
