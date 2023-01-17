import React from 'react';
import {TextInput, TouchableOpacity} from 'react-native';

export default function InputText(props) {
    
    


    return (
            <React.Fragment>
                <TextInput style={{backgroundColor: 'red'}} placeholder={props.placeholder} value={props.value} onChangeText={props.onChangeText}/>
            </React.Fragment>

    )
} 