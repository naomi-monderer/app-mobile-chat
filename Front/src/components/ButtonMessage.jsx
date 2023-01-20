import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';



export default function ButtonMessage(props) {

    const handleSubmit = () => {

        console.log('message sent', props)
        alert(props.text)

        // axios.post(`${API}/chat/${props.idRoom}`, {
        //     content: message,
        //     id: 1,
        //     id_role: 1
        // }).then(res => {
        //     console.warn(res);
        // }).catch(e => {
        //     console.error(e);
        // })

    }

    return (

        <React.Fragment>
            <TouchableOpacity style={styles.container} onPress={() => {
                handleSubmit()
            }} >
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
        backgroundColor: '#567BFF',
        width: 40,
        height: 40,
        borderRadius: 50,
        position: 'absolute',
        right: 20,
        top: 15,
        zIndex: 3
    },
    img: {
        height: 20,
        width: 20,
    }
})