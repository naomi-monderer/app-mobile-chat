import React from "react"
import { View, SafeAreaView, StyleSheet } from "react-native"
import ContactMenu from "../components/ContactMenu"

export default function Contact() {
    return (
        <View>
            <SafeAreaView>
                <ContactMenu />
            </SafeAreaView>
        </View>
    )
}
