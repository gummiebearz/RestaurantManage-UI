import { useFonts } from 'expo-font'
import { useTheme } from './src/contexts/Theme'

import { ThemeProvider, AuthProvider, AuthStorageContext } from './src/contexts'

import { ApolloProvider } from '@apollo/client'
import createApolloClient from './src/utils/apolloClient'
import AuthStorage from './src/storages/AuthStorage'

import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { useAuth } from './src/contexts/Auth'

import { AuthenticationStack, EmpDrawer } from './src/navigations'
import EventStack from './src/navigations/shared/EventStack'

const authStorage = new AuthStorage()
const apolloClient = createApolloClient(authStorage)

const App = () => {
    const [fontsLoaded] = useFonts({
        DMBold: require('./assets/fonts/DMSans-Bold.ttf'),
        DMSemiBold: require('./assets/fonts/DMSans-SemiBold.ttf'),
        DMMedium: require('./assets/fonts/DMSans-Medium.ttf'),
        DMRegular: require('./assets/fonts/DMSans-Regular.ttf'),
        DMThin: require('./assets/fonts/DMSans-Light.ttf')
    })

    if (!fontsLoaded) return null

    return (
        <ThemeProvider>
            <ApolloProvider client={apolloClient}>
                <AuthStorageContext.Provider value={{ authStorage }}>
                    <NavigationContainer>
                        <AuthProvider>
                            <NavigationLayout />
                        </AuthProvider>
                    </NavigationContainer>
                </AuthStorageContext.Provider>
            </ApolloProvider>
        </ThemeProvider>
    )
}

const NavigationLayout = () => {
    const { themeMode } = useTheme()
    const { isAuthenticated, userRole } = useAuth()

    console.log('Authenticated:', isAuthenticated, '- Role:', userRole)

    return (
        <>
            <StatusBar style={themeMode === 'DARK' ? 'light' : 'dark'} />
            {!isAuthenticated && <AuthenticationStack />}
            {/* {!isAuthenticated && (
                <>
                    <EmpDrawer />
                </>
            )} */}
        </>
    )
}

export default App
