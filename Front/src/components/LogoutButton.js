import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import * as SecureStore from 'expo-secure-store';

export default function LogoutButton() {
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
            <TouchableOpacity
                onPress={() => logout()}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#0F0D23',
    },
    buttonText: {
        color: 'white',
        padding: 14,
    }
})