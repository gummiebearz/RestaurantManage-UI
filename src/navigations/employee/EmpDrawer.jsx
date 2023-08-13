import { createDrawerNavigator } from '@react-navigation/drawer'

import { ROUTE, THEME, SIZES, FONTS } from '../../constants'
import { useTheme } from '../../contexts/Theme'

import { WeeklyScheduleScreen } from '../../screens/home'
import AccountStack from '../shared/AccountStack'

import { MaterialCommunityIcons } from '@expo/vector-icons'

const Drawer = createDrawerNavigator()

const EmpDrawer = () => {
    const { themeMode } = useTheme()

    return (
        <Drawer.Navigator
            screenOptions={{
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
                name={ROUTE.EMP.WEEKLY_SCHEDULE}
                component={WeeklyScheduleScreen}
                options={{
                    headerShown: false,
                    headerTitle: 'Weekly Schedule',
                    drawerLabel: 'Weekly Schedule',
                    drawerIcon: ({ focused, size, color }) => (
                        <MaterialCommunityIcons
                            name='timetable'
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
            <Drawer.Screen
                name={ROUTE.SHARED.ACCOUNT_STACK}
                component={AccountStack}
                options={{
                    headerShown: false,
                    headerTitle: 'Account',
                    drawerLabel: 'Account',
                    drawerIcon: ({ focused, size, color }) => (
                        <MaterialCommunityIcons
                            name='account-settings'
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </Drawer.Navigator>
    )
}

export default EmpDrawer
