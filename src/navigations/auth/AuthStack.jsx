import { createStackNavigator } from '@react-navigation/stack'
import { ROUTE } from '../../constants'

import { SignInScreen } from '../../screens/auth'
import { WeeklyScheduleScreen } from '../../screens/home'
import { useAuth } from '../../contexts/Auth'

const Stack = createStackNavigator()

const AuthStack = () => {
    const { isAuthenticated, userRole } = useAuth()
    console.log('AUTH STACK:', isAuthenticated, ' ', userRole)

    return (
        <Stack.Navigator>
            <Stack.Group
                options={{
                    headerShown: false
                }}
            >
                <Stack.Screen
                    name={ROUTE.AUTH.SIGN_IN}
                    component={SignInScreen}
                />
                {/* <Stack.Screen name={ROUTE.AUTH.FORGOT_PASSWORD} /> */}
                <Stack.Screen
                    name={ROUTE.EMP.WEEKLY_SCHEDULE_DRAWER}
                    component={WeeklyScheduleScreen}
                />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default AuthStack
