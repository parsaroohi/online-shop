import React, { useContext } from "react";
import { StyleSheet, FlatList } from 'react-native'
import Screen from "../components/shared/Screen";
import Card from './../components/shared/Card'
import { useSelector } from "react-redux";
import ToplearnContext from '../contexts/ToplearnContext'

const TopCoursesScreen = () => {
    const courses = useSelector(state => state.courses)

    return (
        <Screen style={styles.container}>
            <FlatList data={courses} keyExtractor={(course) => course._id.toString()}
                renderItem={({ item }) => (
                    <Card title={item.title} time={item.time} price={item.price}
                        image={item.image} teacher={item.teacher} />
                )}
            ></FlatList>
        </Screen>
    )
}

export default TopCoursesScreen

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#f8f4f4"
    }
})