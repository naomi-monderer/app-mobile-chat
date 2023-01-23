import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { API } from '../constant/constant';
import * as SecureStore from 'expo-secure-store';
import jwt_decode from 'jwt-decode'

export default function ButtonMessage(props) {

    // console.log(props)
    // console.log(props.idRoom)

    const handleSubmit = () => {

        // console.log('object');

        SecureStore.getItemAsync('token1').then((rest) => {
            SecureStore.getItemAsync('refreshtoken').then((res) => {
                if (res) {
                    var decoded = jwt_decode(rest);
                    // console.log(decoded);

                    console.log(decoded.id_rooms);
                    //array rooms
                    // si token englobe tout pour params req HTTP

                    if (props.text) {
                        axios.post(`${API}/chat/${props.idRoom}`, {
                            data: JSON.stringify({
                                content: props.text,
                                id: decoded.id,
                                id_role: decoded.id_role

                            })
                        }).then(res => {
                            // console.log('message sent fati', res);
                            console.log('naomi')
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