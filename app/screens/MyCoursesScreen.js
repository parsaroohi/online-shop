import React, { useState } from "react";
import { Alert, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Screen from "../components/shared/Screen";
import ToplearnText from '../components/shared/ToplearnText'
import ItemSeperator from '../components/shared/ItemSeperator'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const confirmationAlert = (course, onPress) => {
    return Alert.alert(course.title,
        `آیا می خواهید ${course.title} را از لیست دوره ها پاک کنید؟`,
        [
            {
                text: 'انصراف',
                onPress: () => { },
                style: 'cancel'
            },
            {
                text: 'پاک شود',
                onPress: onPress,
            }
        ], { cancelable: false })
}

const deleteAction = (course, onPress) => {
    return (
        <TouchableOpacity onPress={() => confirmationAlert(course, onPress)}>
            <View style={{
                backgroundColor: 'tomato', width: 50, height: '100%',
                justifyContent: 'center', alignItems: 'center'
            }}>
                <MaterialCommunityIcons name="trash-can" size={35} color="#fff" />
            </View>
        </TouchableOpacity>
    )
}

const MyCoursesScreen = () => {
    const [getMyCourses, setMyCourses] = useState([
        { id: 1, title: "Node Js", teacher: "parsa roohi" },
        { id: 2, title: "React Js", teacher: "parsa roohi" },
        { id: 3, title: "Angular Js", teacher: "parsa roohi" },
        { id: 4, title: "Asp.net core", teacher: "parsa roohi" },
        { id: 5, title: "Xamarin", teacher: "parsa roohi" }
    ])

    const handleDelete = (course) => {
        setMyCourses(getMyCourses.filter(c => c.id !== course.id))
    }

    return (
        <Screen style={{ alignItems: 'center' }}>
            <View style={styles.title}>
                <ToplearnText fontFamily='yekan' size="3" color="#fff">لیست دوره های من</ToplearnText>
            </View>
            <ItemSeperator height={5}></ItemSeperator>
            <View style={{ width: '100%' }}>
                <FlatList data={getMyCourses} keyExtractor={c => c.id.toString()}
                    renderItem={({ item }) => (
                        <View style={{ marginVertical: 7 }}>
                            <ItemSeperator height={3} />
                            <Swipeable renderRightActions={() => deleteAction(item, () => handleDelete(item))}>
                                <View style={styles.container}>
                                    <View style={styles.details}>
                                        <ToplearnText fontFamily="yekan" size="2.5">
                                            {item.title}
                                        </ToplearnText>
                                        <ToplearnText fontFamily="yekan" size="1.5">
                                            {`مدرس دوره: ${item.teacher}`}
                                        </ToplearnText>
                                    </View>
                                </View>
                            </Swipeable>
                            <ItemSeperator height={3} />
                        </View>
                    )} />
            </View>
        </Screen>
    )
}

export default MyCoursesScreen

const styles = StyleSheet.create({
    title: {
        marginVertical: 20,
        backgroundColor: 'tomato',
        padding: 10,
        borderRadius: 10,
        width: '90%',
        alignItems: 'center'
    },

    container: {
        flexDirection: 'row', padding: 14, backgroundColor: 'dodgerblue',
        justifyContent: 'center'
    },

    details: {
        marginLeft: 10, backgroundColor: "#f8f4f4",
        width: '100%', padding: 10, borderRadius: 14, alignItems: 'center'
    }
})