import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import InputText from '../components/InputText';
import InputText2 from '../components/InputText2';
// import ButtonMessage from '../components/ButtonMessage';
// import axios from 'axios';
// import { API } from '../constant/constant';



export default function ChatScreen(props) {

    // const [message, setMessage] = useState('');
    // const MultilineTextInputExample = () => {
  


    const room_id = 4
    


    return (
        <View style={{ position: 'relative', height: '100%' }}>

            <InputText2
                idRoom={room_id}
                onChangeText = {props.text}

              
            
            />

        </View>
    )



}


