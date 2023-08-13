import 'react-native-gesture-handler'

import { AuthStack } from './src/navigations'
import { NavigationContainer } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { ThemeProvider, AuthProvider } from './src/contexts'
import { StatusBar } from 'expo-status-bar'
import { useTheme } from './src/contexts/Theme'

import { ApolloProvider } from '@apollo/client'
import createApolloClient from './src/utils/apolloClient'

import { AuthStorageContext } from './src/contexts'
import AuthStorage from './src/storages/AuthStorage'

const authStorage = new AuthStorage()
const apolloClient = createApolloClient(authStorage)

export default function App() {
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
                    <NavigationLayout />
                </AuthStorageContext.Provider>
            </ApolloProvider>
        </ThemeProvider>
    )
}

const NavigationLayout = () => {
    const { themeMode } = useTheme()

    // AuthStack is wrapped inside AuthContext, in AuthStack there is a Screen leading to Home when the user is logged in
    // This screen renders the Drawer Navigator, which is also wrapped inside AuthContext
    // So we can use AuthContext for various secure/ protected functionalities
    return (
        <NavigationContainer>
            <StatusBar style={themeMode === 'DARK' ? 'light' : 'dark'} />
            <AuthProvider>
                <AuthStack />
            </AuthProvider>
        </NavigationContainer>
    )
}
