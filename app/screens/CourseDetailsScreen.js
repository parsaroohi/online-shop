import React from "react";
import { StyleSheet } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import Card from "../components/shared/Card";
import Screen from "../components/shared/Screen";

const courseDetailsScreen = ({ navigation, route }) => {
    if (!route.params.course) return null

    navigation.setOptions({
        headerShown: true, title: route.params.course.title,
        headerTitleStyle: {
            fontFamily: 'yekan', color: 'white', fontSize: RFPercentage(2.5)
        },
        headerStyle: {
            backgroundColor: 'tomato'
        }
    })

    const { _id, title, price, time, teacher, imageUrl, info } = route.params.course

    return (
        <Screen style={styles.container}>
            <Card title={title} price={price} time={time} teacher={teacher} image={imageUrl}
                courseInfo={info} />
        </Screen>
    )
}

export default courseDetailsScreen

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        backgroundColor: '#f8f4f4'
    }
})