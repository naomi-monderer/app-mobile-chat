import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image} from 'react-native';



export default function ButtonMessage(){

    return (

        <React.Fragment>
            <Text>buttonMessage</Text>
            <TouchableOpacity style = {styles.container} onPress={handleSubmit}>
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
    },
    img: {
        height: 20,
        width:20,
    }
})