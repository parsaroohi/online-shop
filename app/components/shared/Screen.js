import React from "react";
import Constants from 'expo-constants'
import { View, StyleSheet } from 'react-native'

const Screen = ({ children, style }) => {
    return (
        <View style={[styles.screen, style]}>{children}</View>
    )
}

export default Screen

const styles = StyleSheet.create({
    screen: {
        marginTop: Constants.statusBarHeight,
        flex: 1
    }
})