import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import InputText from '../components/InputText';
// import * as SecureStore from 'expo-secure-store';
// import jwt_decode from 'jwt-decode

export default function ChatScreen(props) {

        const room_id = 4;

    return (
        <TouchableWithoutFeedback onPress={()=>{
            Keyboard.dismiss();
        }}>
        <View style = {{ position: 'relative', height: '100%' }}>
            <InputText
                
                idRoom = {room_id}

                //4. je recupère via le props de mon parent mon attribu onChangeText et je lui passe le contenu de l'input
                //  
                onChangeText = {props.text}
            />
        </View>
        </TouchableWithoutFeedback>
    )

}

