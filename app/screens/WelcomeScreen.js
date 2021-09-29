import React, { useEffect } from "react";
import NetInfo from '@react-native-community/netinfo'
import { Alert, StyleSheet, Image, ImageBackground, View, BackHandler } from 'react-native'
import CustomButton from "../components/shared/CustomButton";
import ToplearnText from "../components/shared/ToplearnText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { decodeToken } from "../utils/jwt";
import { StackActions, useNavigationState } from '@react-navigation/native'
import customToast from '../utils/toasts'
import { useDispatch } from 'react-redux'
import { userAction } from '../actions'

const confirmationAlert = () => {
    return Alert.alert('ارتباط با سرور',
        `برای استفاده از اپلیکیشن باید به اینترنت متصل باشید.`,
        [
            {
                text: 'ok',
                onPress: BackHandler.exitApp,
            }
        ], { cancelable: false })
}

const WelcomScreen = ({ navigation }) => {
    const screenIndex = useNavigationState(state => state.index)
    const dispath = useDispatch()

    useEffect(() => {
        let currentCount = 0
        console.log(screenIndex);
        if (screenIndex <= 0) {
            BackHandler.addEventListener("hardwareBackPress", () => {
                if (currentCount === 1) {
                    BackHandler.exitApp()
                    return true
                }
                currentCount += 1
                customToast("برای خروج دوباره دکمه بازگشت را لمس نمایید.")
                setTimeout(() => {
                    currentCount = 0
                }, 1000);
                return true
            })
        }
    }, [])

    useEffect(() => {
        const checkForNet = async () => {
            // await AsyncStorage.removeItem("token")
            // await AsyncStorage.removeItem("userId")
            const state = await NetInfo.fetch()
            if (!state.isConnected) confirmationAlert()
            else {
                const token = await AsyncStorage.getItem("token")
                const userId = JSON.parse(await AsyncStorage.getItem("userId"))
                if (token !== null && userId !== null) {
                    const decodedToken = decodeToken(token)
                    dispath(userAction(decodedToken.user))
                    if (decodedToken.user.userId === userId) {
                        // navigation.navigate("Home")
                        navigation.dispath(
                            StackActions.replace("Home")
                        )
                    } else {
                        await AsyncStorage.removeItem("token")
                        await AsyncStorage.removeItem("userId")
                        navigation.navigate("Login")
                    }
                }
            }
        }
        checkForNet()
    }, [])

    return (
        <ImageBackground source={require('../assets/bg1.jpg')}
            style={styles.background} blurRadius={3}>
            <View style={styles.logoContainer}>
                <Image source={require("../assets/logo.png")} style={styles.logo} />
                <ToplearnText fontFamily="ih" size="2"
                    styles={styles.firstText}>خود آموزی، کسب تجربه، ورود به بازار کار</ToplearnText>
            </View>
            <View style={styles.buttonContainer}>
                <CustomButton title="ورود" color="royalblue" onPress={() => navigation.navigate('Login')} />
                <CustomButton title="ثبت نام" onPress={() => navigation.navigate('Register')} />
            </View>
        </ImageBackground>
    )
}

export default WelcomScreen

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    buttonContainer: {
        width: '100%',
        padding: 20
    },

    logo: {
        width: 26,
        height: 190
    },

    firstText: {
        top: 25,
        color: 'tomato'
    },

    logoContainer: {
        position: 'absolute',
        top: 70,
        alignItems: 'center'
    }
})