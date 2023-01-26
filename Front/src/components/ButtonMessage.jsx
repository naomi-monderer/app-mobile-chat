import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { API } from '../constant/constant';
import * as SecureStore from 'expo-secure-store';
import jwt_decode from 'jwt-decode'

export default function ButtonMessage(props) {

    const handleSubmit = () => {

        SecureStore.getItemAsync('token1').then((rest) => {
            console.log('rest: '+ rest);
            SecureStore.getItemAsync('refreshtoken').then((res) => {
                if (res) {
                    var decoded = jwt_decode(rest);
                    

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
                            // 5. Une fois mon message bien reçu à la bdd,
                            //    je set le contenu de l'input à 'vide' pour clear l'input.
                            props.setText('');
                            console.log('res: ' + res)
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
        zIndex: 3,
        borderColor:'#EFE2E2',
        borderWidth:0.5,
    },
    img: {
        height: 20,
        width: 20,
    }
})