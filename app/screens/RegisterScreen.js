import React from "react";
import { View, StyleSheet, Image } from 'react-native'
import * as Yup from 'yup'
import { registerUser } from "../api/users";
import { ToplearnFormField, ToplearnForm, SubmitButton } from '../components/forms'
import Screen from "../components/shared/Screen";
import Toast from 'react-native-tiny-toast'
import { customToast, loadingToast } from "../utils/toasts";

const validationSchema = Yup.object().shape({
    fullname: Yup.string().required('نام و نام خانوادگی الزامی است.'),
    email: Yup.string().required('این فیلد الزامی است.').email('ایمیل معتبر نمی باشد.'),
    password: Yup.string().required('این فیلد الزامی است.').min(4, 'کلمه عبور نباید کمتر از 4 کاراکتر باشد.'),
    passwordConfirmation: Yup.string().required('تکرار کلمه عبور الزامی است.')
        .oneOf([Yup.ref('password'), null], 'کلمه عبور باید یکسان باشد.')
})

const RegisterScreen = ({ navigation }) => {

    const handleUserRegistration = async (user) => {
        try {
            loadingToast("ثبت نام کاربر...")
            const status = await registerUser(user)
            if (status === 201) {
                Toast.hide()
                navigation.navigate("Login", { successRegister: true })
            } else {
                Toast.hide()
                customToast("خطایی رخ داده است.")
            }
        } catch (err) {
            Toast.hide()
            console.log(err);
        }
    }

    return (
        <Screen style={styles.container}>
            <Image style={styles.logo} source={require('../assets/logo.png')} />
            <ToplearnForm initialValues={{ fullname: "", email: "", password: "", passwordConfirmation: "" }}
                onSubmit={user => {
                    console.log(user);
                    handleUserRegistration(user)
                }}
                validationSchema={validationSchema}>
                <ToplearnFormField placeholder="نام و نام خانوداگی"
                    autoCorrect={false} icon="account-circle" name="fullname"
                    placeholderTextColor="royalblue" />
                <ToplearnFormField placeholder="ایمیل کاربری" autoCompleteType='email'
                    autoCorrect={false} keyboardType="email-address" icon="email"
                    placeholderTextColor="royalblue" name="email" />
                <ToplearnFormField placeholder="کلمه عبور"
                    autoCorrect={false} icon="onepassword" secureTextEntry={true}
                    placeholderTextColor="royalblue" name="password" />
                <ToplearnFormField placeholder="تکرار کلمه عبور"
                    autoCorrect={false} icon="onepassword" secureTextEntry={true}
                    placeholderTextColor="royalblue" name="passwordConfirmation" />
                <View style={{ width: '60%' }}>
                    <SubmitButton title="ثبت نام" />
                </View>
            </ToplearnForm>
        </Screen>
    )
}

export default RegisterScreen

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