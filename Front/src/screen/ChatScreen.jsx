import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import InputText from '../components/InputText';



export default function ChatScreen({ navigation }) {

    const [message, setMessage] = useState('');

    return (
        <View>
            {/* <RenderButtonMessage/> */}
            <Text>
                Bienvenue sur ChatScreen
            </Text>
            <InputText placeholder="Test" value={message} onChangeText={(text) => setMessage(text)} />
            <TouchableOpacity onPress={() => alert(message)}><ActivityIndicator size="large" /></TouchableOpacity>

        </View>
    )
}

// const InputMessage = () => {

//     return (
//         <ScrollView>
//             <TextInput   defaultValue="You can type in me">

//             </TextInput>
//         </ScrollView>
//     )

// }

// const ButtonSendMessage = () => {

//     return ()
// }
// const styles = () =>{

//  StyleSheet.create({

// })
// }

// export default ;