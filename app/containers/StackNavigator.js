import React from "react"
import { createStackNavigator } from '@react-navigation/stack'
import { WelcomeScreen, LoginScreen, RegisterScreen, courseDetailsScreen } from '../screens'
import TabsNavigators from './TabsNavigators'

const StackNavigators = () => {

    const Stack = createStackNavigator()

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen}
                initialParams={{ successRegister: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Home" component={TabsNavigators} />
            <Stack.Screen name="CourseDetails" component={courseDetailsScreen} />
        </Stack.Navigator>
    )

}

export default StackNavigators