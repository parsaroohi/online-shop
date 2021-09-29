import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { numberWithCommas } from '../../utils/price'
import ToplearnText from "./ToplearnText";

const Card = ({ title, price, teacher, time, image, courseInfo = null }) => {
    return (
        <View style={styles.card}>
            <Image resizeMode='contain'
                source={{ uri: `https://rnapi.ghorbany.dev/${image}` }}
                style={styles.courseImage} />
            <View style={{ padding: 20 }}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.courseDetails}>
                    <Text style={styles.price}>
                        قیمت دوره:
                        {price === 0 ? "رایگان" : `${numberWithCommas(price)} تومان`}
                    </Text>
                    <Text style={styles.time}>زمان دوره: {time}</Text>
                </View>
                <View style={styles.userContainer}>
                    <Text style={styles.teacher}>مدرس دوره: {teacher}</Text>
                </View>
            </View>
            {courseInfo ? (
                <View style={{ flex: 1 }}>
                    <ToplearnText fontFamily="yekan" size="2.5">
                        توضیحات دوره
                    </ToplearnText>
                    <ScrollView>
                        <ToplearnText fontFamily="ih" size="2.5" styles={styles.courseInformation}>
                            {courseInfo}
                        </ToplearnText>
                    </ScrollView>
                </View>
            ) : null}
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    card: {
        flex: 1,
        borderRadius: 15,
        backgroundColor: 'white',
        marginBottom: 20
    },

    courseImage: {
        width: '100%',
        height: 300,
    },

    container: {
        flexDirection: 'row',
        marginVertical: 20,
        padding: 15
    },

    courseDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    userContainer: {
        marginVertical: 10
    },

    title: {
        marginBottom: 7,
        fontFamily: 'yekan',
        fontSize: 20,
        alignSelf: 'center'
    },

    time: {
        fontFamily: 'yekan'
    },

    price: {
        fontFamily: 'yekan'
    },

    teacher: {
        fontFamily: 'ih',
        fontSize: 15,
        alignSelf: 'center'
    },

    courseInformation: {
        textAlign: 'justify',
        marginVertical: 10,
        lineHeight: 25
    }
})