import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import InputText from '../components/InputText';
// import ButtonMessage from '../components/ButtonMessage';
// import axios from 'axios';
// import { API } from '../constant/constant';



export default function ChatScreen(props) {

    const room_id = 4

    return (
        <View style={{ position: 'relative', height: '100%' }}>

            <InputText
                idRoom={room_id}
                onChangeText = {props.text}
            />
        </View>
    )
}


