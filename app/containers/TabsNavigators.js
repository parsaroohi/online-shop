import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import MyCoursesScreen from '../screens/MyCoursesScreen'
import CoursesScreen from '../screens/CoursesScreen'
import AccountScreen from '../screens/AccountScreen'
import TopTabNavigator from './TopTabNavigator'

const Tab = createBottomTabNavigator()

const TabsNavigators = () => {
    return (
        <Tab.Navigator initialRouteName="Courses" screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Courses') {
                    iconName = focused ? 'library-video' : 'school'
                } else if (route.name === 'Account') {
                    iconName = focused ? 'account-circle' : 'account-circle-outline'
                } else if (route.name === 'MyCourses') {
                    iconName = 'message-video'
                }
                return (
                    <MaterialCommunityIcons name={iconName} size={size} color={color} />
                )
            },
        })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
                activeBackgroundColor: 'royalblue',
                labelStyle: {
                    fontFamily: 'ih',
                    fontSize: 13
                }
            }}>
            <Tab.Screen name="MyCourses" component={MyCoursesScreen} options={{
                tabBarLabel: "دوره های من",
                tabBarBadge: 3
            }} />
            <Tab.Screen name="Courses" component={TopTabNavigator} options={{
                tabBarLabel: "دوره ها"
            }} />
            <Tab.Screen name="Account" component={AccountScreen} options={{
                tabBarLabel: "اکانت من"
            }} />
        </Tab.Navigator>
    )
}

export default TabsNavigators