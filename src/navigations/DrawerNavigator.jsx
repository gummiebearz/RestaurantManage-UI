import { createDrawerNavigator } from '@react-navigation/drawer'
import { ROUTES, SIZES } from '../constants'
import { WeeklyScheduleScreen, AccountScreen } from '../screens/home'
import { useTheme } from '../contexts/Theme'
import { THEME, FONTS } from '../constants'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { WeeklyScheduleStack } from '../screens/home/WeeklySchedule'

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
    const router = useNavigation()
    const { themeMode } = useTheme()
    return (
        <Drawer.Navigator
            initialRouteName={ROUTES.HOME.HOME_DRAWER}
            screenOptions={{
                // title: '',
                // headerShown: false,
                headerShadowVisible: false,
                drawerStyle: {
                    backgroundColor: THEME[themeMode].background.secondary
                },
                drawerLabelStyle: {
                    fontFamily: FONTS.bold,
                    fontSize: SIZES.medium,
                    marginLeft: -SIZES.medium
                },
                drawerActiveTintColor: THEME[themeMode].text.darkGrey,
                drawerActiveBackgroundColor: THEME[themeMode].background.green,
                drawerInactiveTintColor: THEME[themeMode].text.white
            }}
        >
            <Drawer.Screen
                // component={WeeklyScheduleScreen}
                component={WeeklyScheduleStack}
                name={ROUTES.HOME.HOME_DRAWER}
                options={{
                    headerTitle: 'Weekly Schedule',
                    drawerLabel: 'Weekly Schedule',
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: THEME[themeMode].background.primary
                    },
                    headerTintColor: THEME[themeMode].background.green,
                    drawerIcon: ({ focused, size, color }) => (
                        <MaterialCommunityIcons
                            name='timetable'
                            size={size}
                            color={color}
                        />
                    ),
                    headerRight: () => (
                        <TouchableOpacity
                            style={{ paddingRight: 16 }}
                            onPress={() => router.navigate(ROUTES.HOME.ACCOUNT)}
                        >
                            <MaterialCommunityIcons
                                name='account'
                                size={24}
                                color={THEME['DARK'].background.green}
                            />
                        </TouchableOpacity>
                    )
                }}
            />
            <Drawer.Screen
                component={AccountScreen}
                name={ROUTES.HOME.ACCOUNT}
                options={{
                    headerTitle: '',
                    drawerLabel: 'Account',
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: THEME[themeMode].background.green
                    },
                    headerTintColor: THEME[themeMode].background.primary,
                    drawerIcon: ({ focused, size, color }) => (
                        <MaterialCommunityIcons
                            name='account-settings'
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
        </Drawer.Navigator>
    )
}

export default DrawerNavigator
