import {
    StyleSheet,
    SafeAreaView,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import { Text } from '../../components'
import { useTheme } from '../../contexts/Theme'
import { THEME } from '../../constants'
import { Formik } from 'formik'

const SignInForm = () => {
    const initialValues = { username: '', password: '' }
    const handleSignIn = async (values, resetForm) => {
        console.log(values)
    }

    return (
        <Formik
            initialValues={initialValues}
            validateOnBlur
            validateOnChange
            onSubmit={(values, { resetForm }) =>
                handleSignIn(values, resetForm)
            }
        >
            {({ values, handleChange, handleBlur, handleSubmit }) => (
                <View>
                    <View>
                        <TextInput
                            autoCapitalize='none'
                            name='username'
                            onBlur={handleBlur('username')}
                            onChange={handleChange('username')}
                            value={values.username}
                            placeholder='Username'
                            style={styles(themeMode).input}
                            placeholderTextColor={THEME[themeMode].text.grey}
                        />
                        <TextInput
                            name='password'
                            secureTextEntry
                            onBlur={handleBlur('password')}
                            onChange={handleChange('password')}
                            value={values.password}
                            placeholder='Password'
                            style={styles(themeMode).input}
                            placeholderTextColor={THEME[themeMode].text.grey}
                        />
                    </View>
                    <View style={styles(themeMode).signInBtnWrapper}>
                        <TouchableOpacity style={styles(themeMode).signInBtn}>
                            <Text
                                variant='bold'
                                style={styles(themeMode).signInBtnText}
                            >
                                Sign In
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </Formik>
    )
}

export default function SignInScreen() {
    const { themeMode } = useTheme()

    return (
        <SafeAreaView style={styles(themeMode).safeAreaContainer}>
            <ScrollView
                contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'space-between'
                }}
            >
                <View style={styles(themeMode).viewContainer}>
                    <View style={styles(themeMode).wFull}>
                        <View style={styles(themeMode).intro}>
                            <Text
                                variant='bold'
                                style={{ fontSize: 30, textAlign: 'center' }}
                            >
                                Schedule Management
                            </Text>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontSize: 16,
                                    color: THEME[themeMode].text.white,
                                    opacity: 0.6
                                }}
                            >
                                View your assigned weekly schedule and many
                                more.
                            </Text>
                        </View>
                        <View></View>
                    </View>
                    <View style={styles(themeMode).footer}>
                        <TouchableOpacity>
                            <Text variant='medium'>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = (mode = null) =>
    StyleSheet.create({
        safeAreaContainer: {
            backgroundColor: THEME[mode].background.primary,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 16
        },
        viewContainer: {
            padding: 15,
            width: '100%',
            position: 'relative',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        wFull: {
            width: '100%'
        },
        intro: {
            rowGap: 3,
            marginBottom: 20
        },
        input: {
            borderWidth: 1,
            padding: 15,
            marginVertical: 10,
            borderRadius: 10,
            height: 55,
            paddingVertical: 0,
            borderColor: THEME[mode].button.green,
            color: THEME[mode].text.white,
            fontSize: 16
        },
        signInBtnWrapper: {
            height: 55,
            marginTop: 20,
            shadowColor: THEME[mode].button.green,
            shadowOffset: {
                width: 1,
                height: 1
            },
            shadowOpacity: 0.4,
            shadowRadius: 14,
            elevation: 10,
            backgroundColor: THEME[mode].button.green,
            borderRadius: 80
        },
        signInBtn: {
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: 55
        },
        signInBtnText: {
            color: THEME[mode].text.dark,
            fontSize: 16
        },
        footer: {
            position: 'absolute',
            bottom: 20,
            textAlign: 'center',
            flexDirection: 'row'
        }
    })
