import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import InputText from '../components/InputText';
// import * as SecureStore from 'expo-secure-store';
// import jwt_decode from 'jwt-decode

export default function ChatScreen(props ) {

   
    //    const [message, setMessage] = useState('');
       const room_id = 4
    //    const Id_room = props.id_room 


    return (
        <TouchableWithoutFeedback onPress={()=>{
            Keyboard.dismiss();
        }}>
        <View style = {{ position: 'relative', height: '100%' }}>
            <InputText
                
                idRoom = {room_id}
                onChangeText = {props.text}
            />
        </View>
        </TouchableWithoutFeedback>
    )

}

