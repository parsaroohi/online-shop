import React, { useEffect } from "react";
import { TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import Screen from "../components/shared/Screen";
import Card from './../components/shared/Card'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { decodeToken } from "../utils/jwt";
import { useSelector } from 'react-redux'

const CoursesScreen = ({ navigation }) => {
    const courses = useSelector(state => state.courses)

    useEffect(() => {
        const myFunc = async () => {
            const token = await AsyncStorage.getItem("token")
            console.log(decodeToken(token));
        }
        myFunc()
    }, [])

    return (
        <Screen style={styles.container}>
            <FlatList data={courses} keyExtractor={(course) => course._id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate("CourseDetails", { course: item })}>
                        <Card title={item.title} time={item.time} price={item.price}
                            image={item.imageUrl} teacher={item.teacher}
                            courseInfo={item.info} />
                    </TouchableOpacity>
                )}
            ></FlatList>
        </Screen>
    )
}

export default CoursesScreen

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#f8f4f4"
    }
})