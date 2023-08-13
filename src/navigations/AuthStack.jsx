import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SignInScreen } from '../screens/auth'
import DrawerNavigator from './DrawerNavigator'
import { ROUTES } from '../constants'

const Stack = createNativeStackNavigator()

const AuthStack = () => {
    return (
        // screenOptions means options configured for all stack screens
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name={ROUTES.AUTH.SIGN_IN}
                component={SignInScreen}
                // options={{ headerShown: false }}
            />
            {/* <Stack.Screen
                name={ROUTES.AUTH.FORGOT_PASSWORD}
                component={ForgotPassword}
            /> */}
            <Stack.Screen
                name={ROUTES.HOME.HOME}
                component={DrawerNavigator}
                // options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default AuthStack
