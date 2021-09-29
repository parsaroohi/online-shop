import React, { useEffect } from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { RFPercentage } from 'react-native-responsive-fontsize'
import Screen from "../components/shared/Screen";
import CoursesScreen from "../screens/CoursesScreen";
import NewCoursesScreen from "../screens/NewCoursesScreen";
import TopCoursesScreen from "../screens/TopCoursesScreen";
import { fetchCourses } from "../api/courses";
import Toast from "react-native-tiny-toast";
import { loadingToast } from "../utils/toasts";
import { useDispatch } from 'react-redux'
import { getCourses } from "../actions";

const TopTab = createMaterialTopTabNavigator()

const TopTabNavigator = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        try {
            const fetchData = async () => {
                loadingToast("در حال بارگذاری...")
                const courses = await fetchCourses()
                dispatch(getCourses())
                Toast.hide()
            }
            fetchData()
        } catch (err) {
            console.log(err);
            Toast.hide()
        }
    }, [])

    return (
        <Screen>
            <TopTab.Navigator initialRouteName="AllCourses"
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                    labelStyle: {
                        fonFamily: 'ih',
                        fontSize: RFPercentage(1.5)
                    },
                    style: {
                        backgroundColor: '#f8f4f4'
                    }
                }}>
                <TopTab.Screen name="AllCourses" component={CoursesScreen}
                    options={{ tabBarLabel: "همه دوره ها" }} />
                <TopTab.Screen name="NewCourses" component={NewCoursesScreen}
                    options={{ tabBarLabel: "دوره های جدید" }} />
                <TopTab.Screen name="TopCourses" component={TopCoursesScreen}
                    options={{ tabBarLabel: "دوره های محبوب" }} />
            </TopTab.Navigator>
        </Screen>
    )
}

export default TopTabNavigator