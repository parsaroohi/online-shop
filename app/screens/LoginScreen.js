import React, { useEffect } from "react";
import { View, StyleSheet, Image } from 'react-native'
import Toast from "react-native-tiny-toast";
import * as Yup from 'yup'
import { loginUser } from "../api/users";
import { ToplearnFormField, ToplearnForm, SubmitButton } from '../components/forms'
import Screen from "../components/shared/Screen";
import { customToast, loadingToast, successToast } from "../utils/toasts";

const validationSchema = Yup.object().shape({
    email: Yup.string().required('این فیلد الزامی است.').email('ایمیل معتبر نمی باشد.'),
    password: Yup.string().required('این فیلد الزامی است.').min(4, 'کلمه عبور نباید کمتر از 4 کاراکتر باشد.')
})

const LoginScreen = ({ navigation, route }) => {
    useEffect(() => {
        if (route.params.successRegister) {
            successToast("ثبت نام موفقیت آمیز بود.")
        }
    }, [])

    const handleUserLogin = async (user) => {
        try {
            loadingToast("در حال برقراری ارتباط...")
            const status = await loginUser(user)
            if (status === 200) {
                Toast.hide()
                successToast("ورود موفقیت آمیز بود.")
                // navigation.navigate("Home")
                navigation.reset({
                    index: 0,
                    routes: [{ name: "Home" }]
                })
            } else {
                Toast.hide()
                customToast("ایمیل کاربری یا کلمه عبور صحیح نمی باشد.")
            }
        } catch (err) {
            Toast.hide()
            console.log(err);
        }
    }

    return (
        <Screen style={styles.container}>
            <Image style={styles.logo} source={require('../assets/logo.png')} />
            <ToplearnForm initialValues={{ email: "", password: "" }}
                onSubmit={(user) => { handleUserLogin(user) }}
                validationSchema={validationSchema}>
                <ToplearnFormField placeholder="ایمیل کاربری" autoCompleteType='email'
                    autoCorrect={false} keyboardType="email-address" icon="email"
                    placeholderTextColor="royalblue" name='email' />
                <ToplearnFormField placeholder="کلمه عبور" autoCompleteType='password'
                    autoCorrect={false} icon="onepassword" secureTextEntry={true}
                    placeholderTextColor="royalblue" name='password' />
                <View style={{ width: '60%' }}>
                    <SubmitButton title="ورود کاربر" />
                </View>
            </ToplearnForm>
        </Screen>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },

    logo: {
        width: 270,
        height: 200,
        marginTop: 20,
        marginBottom: 40
    }
})