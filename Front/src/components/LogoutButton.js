import React from 'react';
import ROUTES from '../constant/routes';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as SecureStore from 'expo-secure-store';

export default function LogoutButton({navigation}) {
    const logout = () => {
        SecureStore.getItemAsync('token1').then((res) => {
            if (res) {
                SecureStore.deleteItemAsync('token1').then(() => {
                    SecureStore.deleteItemAsync('refreshtoken')
                })
            }
        })
    }

    return (
        <View>
            <TouchableOpacity style={styles.button}
                onPress={() => logout()}
            >
                <Text style={styles.buttonText}
                   
                >Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#080713',
        width: "100%",
        borderBottomWidth: 0.5,
        borderBottomColor: "#FFFFFF",
    },
    buttonText: {
    color: '#FFFFFF',
    padding: 20,
    fontSize: 20,
    
    }
})