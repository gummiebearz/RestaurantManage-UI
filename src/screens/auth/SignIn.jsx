import {
    SafeAreaView,
    ScrollView,
    View,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'
import CheckBox from 'expo-checkbox'
import { Text } from '../../components'
import { Formik } from 'formik'
import { useTheme } from '../../contexts/Theme'
import signInStyles from '../../styles/auth/signin'
import { useAuth } from '../../contexts/Auth'
import { useEffect, useState } from 'react'
import { THEME, ROUTES } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import LottieView from 'lottie-react-native'
import { useAuthStorage } from '../../contexts/AuthStorage'

const SignInScreen = () => {
    const { themeMode } = useTheme()
    const { signIn } = useAuth()
    const { authStorage } = useAuthStorage()
    const [username, setUsername] = useState('')

    const router = useNavigation()

    const initialValues = { username, password: '' }
    const [rememberMe, setRememberMe] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        const fetchSavedCreds = async () => {
            const savedUsername = await authStorage.getAccessToken('username')
            if (savedUsername) setUsername((_prev) => savedUsername)
        }

        fetchSavedCreds()
    }, [])

    const handleSignIn = async (values, resetForm) => {
        setIsSubmitting((_prev) => true)
        const response = await signIn({
            username: values.username,
            password: values.password,
            rememberMe
        })

        resetForm({ ...initialValues })
        setRememberMe((_prev) => false)
        setIsSubmitting((_prev) => false)
        if (response.passed) router.navigate(ROUTES.HOME.HOME)
    }

    return (
        <SafeAreaView style={signInStyles(themeMode).safeAreContainer}>
            <ScrollView
                contentContainerStyle={
                    signInStyles(themeMode).scrollViewContainer
                }
            >
                <View style={signInStyles(themeMode).mainContainer}>
                    <LottieView
                        style={signInStyles(themeMode).gifContainer}
                        source={require('../../../assets/gifs/floating-diamond.json')}
                        autoPlay
                        loop
                    />
                    <View style={signInStyles(themeMode).widthFull}>
                        <View style={signInStyles(themeMode).introContainer}>
                            <Text
                                variant='bold'
                                style={signInStyles(themeMode).introPrimaryText}
                            >
                                Schedule Management
                            </Text>
                            <Text style={signInStyles(themeMode).intoSecText}>
                                View and manage your schedule with ease
                            </Text>
                        </View>
                        <Formik
                            initialValues={initialValues}
                            enableReinitialize
                            validateOnBlur
                            validateOnChange
                            onSubmit={(values, { resetForm }) =>
                                handleSignIn(values, resetForm)
                            }
                        >
                            {({
                                values,
                                handleBlur,
                                handleChange,
                                handleSubmit
                            }) => (
                                <View
                                    style={
                                        signInStyles(themeMode)
                                            .formikFormWrapper
                                    }
                                >
                                    <TextInput
                                        style={
                                            signInStyles(themeMode).formikInput
                                        }
                                        autoCapitalize='none'
                                        name='username'
                                        id='username'
                                        onBlur={handleBlur('username')}
                                        onChangeText={handleChange('username')}
                                        value={values.username}
                                        placeholder='Username'
                                        placeholderTextColor={
                                            themeMode === 'DARK'
                                                ? '#3d4244'
                                                : '#010101'
                                        }
                                    />
                                    <TextInput
                                        style={
                                            signInStyles(themeMode).formikInput
                                        }
                                        name='password'
                                        id='password'
                                        secureTextEntry
                                        onBlur={handleBlur('password')}
                                        onChangeText={handleChange('password')}
                                        value={values.password}
                                        placeholder='Password'
                                        placeholderTextColor={
                                            themeMode === 'DARK'
                                                ? '#3d4244'
                                                : '#010101'
                                        }
                                    />
                                    <View
                                        style={
                                            signInStyles(themeMode)
                                                .rememberMeContainer
                                        }
                                    >
                                        <CheckBox
                                            style={
                                                signInStyles(themeMode)
                                                    .rememberMeCheckbox
                                            }
                                            value={rememberMe}
                                            onValueChange={setRememberMe}
                                            color={
                                                rememberMe
                                                    ? THEME[themeMode]
                                                          .background.green
                                                    : undefined
                                            }
                                        />
                                        <Text
                                            style={
                                                signInStyles(themeMode)
                                                    .forgotPasswordText
                                            }
                                        >
                                            Remember me?
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={handleSubmit}
                                        style={
                                            signInStyles(themeMode)
                                                .formikSignInBtn
                                        }
                                        disabled={isSubmitting}
                                    >
                                        {!isSubmitting ? (
                                            <Text
                                                variant='semiBold'
                                                style={
                                                    signInStyles(themeMode)
                                                        .formikSignInBtnText
                                                }
                                            >
                                                Sign In
                                            </Text>
                                        ) : (
                                            <ActivityIndicator
                                                size='small'
                                                color={
                                                    THEME[themeMode].background
                                                        .primary
                                                }
                                            />
                                        )}
                                    </TouchableOpacity>
                                </View>
                            )}
                        </Formik>
                    </View>
                </View>
                <TouchableOpacity>
                    <Text style={signInStyles(themeMode).forgotPasswordText}>
                        Forgot Password?
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignInScreen
