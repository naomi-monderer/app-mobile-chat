import React, {useState} from 'react';

import { TextInput, TouchableOpacity, StyleSheet, View, ScrollView, Keyboard, KeyboardAvoidingView } from 'react-native';
import ButtonMessage from './ButtonMessage';



export default function InputText2(props) {



    const [text, setText] = useState('JJ');
    const [height, setHeight] = useState()

    return (
        
                <View style={styles.container}>
                <View style={styles.head} />

                <KeyboardAvoidingView 
                    style={styles.box} 
                    keyboardVerticalOffset = {100}
                    behavior = {Platform.OS === 'ios' ? 'padding' : null }>
                    <View style={styles.foot}>
                        <TextInput 
                            multiline = {true}
                            // numberOfLines={4}
                            onChangeText = {(text) => setText(text)}
                            onContentSizeChange = {
                                ({
                                nativeEvent: {
                                    contentSize : {height} 
                                }
                            }) => {setHeight(height)
                            }}
                            style = {[styles.input, {height}]}
                        />
                        <ButtonMessage  text= {text}/>
                    </View>

                </KeyboardAvoidingView>
            </View>
    )
}



const styles = StyleSheet.create({

        container: {
            flex: 1,
            backgroundColor: '#0F0D23',

        },
        box:{
            
            BackgroundColor:'red',
        },
        head: {
            borderBottomWidth: 1,
            borderBottomColor: '#717171',
            flex: 1,
            backgroundColor: '#0F0D23',

        },
        foot: {
            
            padding: 10,
            paddingBottom:10,
            display: 'flex',
            alignItems: 'center',
            maxHeight: 140, 
        },
        input: {

            backgroundColor:'#ADADAD',
            borderRadius: 25,
            width: '100%',
            position:'relative',
            display:'flex',
            flexDirection:'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 20,
            paddingRight: 70,
            fontSize: '20px',
            maxHeight: 130, 
            height:'30%',
            padding: 45
        }

})
