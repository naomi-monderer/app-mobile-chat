import React, { useState } from 'react';
import { TextInput, TouchableOpacity, StyleSheet, View, ScrollView, Keyboard, KeyboardAvoidingView } from 'react-native';
import ButtonMessage from './ButtonMessage';

export default function InputText(props) {

    const [text, setText] = useState('');
    const [height, setHeight] = useState()

    // console.log(text)
    return (

        <View style={styles.container}>
            <View style={styles.head} />

            <KeyboardAvoidingView
                style={styles.box}
                keyboardVerticalOffset={100}
                behavior={Platform.OS === 'ios' ? 'padding' : null}>
                <View style={styles.foot}>
                    <TextInput
                        multiline={true}
                        onChangeText = {(text) => setText(text)}
                        style= {[styles.input, {height}]}
                        // onFocus={() =>console.log("focus received" ) }
                    />
                    <ButtonMessage  
                        text={text} 
                        idRoom={props.idRoom} 
                    />
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#080713',

    },
    box: {

        BackgroundColor: 'red',
    },
    head: {
        borderBottomWidth: 1,
        borderBottomColor: '#717171',
        flex: 1,
        backgroundColor: '#080713',

    },
    foot: {
        padding: 10,
        paddingBottom: 10,
        display: 'flex',
        alignItems: 'center',
        maxHeight: 170,
    },
    input: {

        backgroundColor: '#ADADAD',
        borderRadius: 25,
        width: '100%',
        position: 'relative',
        paddingLeft: 20,
        paddingRight: 70,
        paddingTop:11,
        paddingBottom: 16,
        height: '1px',
        fontSize: '20px',
        maxHeight: 160,
        color: '#373737',
        // color: 'red'
    },
    // height: {
        
    //     backgroundColor: 'blue',
    //     height : '150px',

    // }

})
