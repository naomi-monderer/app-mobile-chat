import React from "react"
import { View, SafeAreaView, StyleSheet, Text } from "react-native"
import ContactMenu from "../components/ContactMenu"

export default function Contact() {
    return (
        <View
            style={styles.background}
        >
            <Text
                style={styles.title}
            >
                My chuu-rooms
            </Text>
            <SafeAreaView>
                <ContactMenu />
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
		backgroundColor: '#080713'
    },
    title: {
        color: '#C5AAFF',
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 50,
        marginLeft: 14
    }
})