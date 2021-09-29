import React from "react";
import { StyleSheet, FlatList } from 'react-native'
import Screen from "../components/shared/Screen";
import Card from './../components/shared/Card'
import { useSelector } from 'react-redux'

const NewCoursesScreen = () => {
    const courses = useSelector(state => state.courses)

    return (
        <Screen style={styles.container}>
            <FlatList data={courses} keyExtractor={(course) => course._id.toString()}
                renderItem={({ item }) => (
                    <Card title={item.title} time={item.time} price={item.price}
                        image={item.imageUrl} teacher={item.teacher} />
                )}
            ></FlatList>
        </Screen>
    )
}

export default NewCoursesScreen

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#f8f4f4"
    }
})