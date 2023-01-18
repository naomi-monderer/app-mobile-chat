import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import InputText from '../components/InputText';
import ButtonMessage from '../components/ButtonMessage';




const handleSubmit = () =>{

    if(value.length < 1000 || value !== undefined  || value !== null)
    {
        alert('Enter correct text value .')
        return 
    }

}

export default function ChatScreen({ navigation }) {

    const [message, setMessage] = useState('');

    return (
        <View>
            {/* <RenderButtonMessage/> */}
            <Text>
                Bienvenue sur ChatScreen
            </Text>
            <InputText placeholder="Test" value={message} onChangeText={(text) => setMessage(text)} />
            <ButtonMessage/>
            {/* <TouchableOpacity onPress={() => alert(message)}><ActivityIndicator size="large" /></TouchableOpacity> */}

        </View>
    )
}

