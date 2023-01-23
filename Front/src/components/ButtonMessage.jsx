import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { API } from '../constant/constant';
import * as SecureStore from 'expo-secure-store';
import jwt_decode from 'jwt-decode'

export default function ButtonMessage(props) {

    console.log('actualisation du texte: '+ props.text);
    // console.log(props.idRoom)

    const handleSubmit = () => {

        console.log('on passe le handleSubmit');

        SecureStore.getItemAsync('token1').then((rest) => {
            console.log('reest'+ rest);
            SecureStore.getItemAsync('refreshtoken').then((res) => {
                if (res) {
                    var decoded = jwt_decode(rest);

                    console.log('SECURESTORE: '+ decoded);

                    if (props.text) {
                        axios.post(`${API}/chat/${props.idRoom}`, 
                        JSON.stringify({
                            content: props.text,
                        }),
                        {
                            headers: {
                                'Content-Type' : 'application/json',
                                token1 : rest,
                                refreshtoken : res
                            }
                        }).then(res => {
                            // console.log('message sent fati', res);
                            console.log('res: ' + res)
                            // console.warn(res);
                        }).catch(e => {
                            console.error(e);
                        })
                    }
                }
            })
        })


    }

    return (

        <React.Fragment>
            <TouchableOpacity
                style={styles.container}

                onPress={() => {
                    handleSubmit()
                }}
            >
                <Image
                    style={styles.img}
                    source={require('../../assets/icons/right-arrow.png')}
                />
            </TouchableOpacity>
        </React.Fragment>
    )

}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C7FFDA',
        width: 40,
        height: 40,
        borderRadius: 50,
        position: 'absolute',
        right: 20,
        top: 15,
        zIndex: 3
    },
    img: {
        height: 20,
        width: 20,
    }
})