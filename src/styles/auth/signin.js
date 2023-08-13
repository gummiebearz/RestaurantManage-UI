import { THEME, SIZES, FONTS } from '../../constants'
import { StyleSheet } from 'react-native'
import commonStyle from '../commonStyle'

const signInStyles = (mode = 'DARK') =>
    StyleSheet.create({
        safeAreContainer: {
            ...commonStyle(mode).safeAreaContainer,
            padding: SIZES.medium,
            justifyContent: 'center',
            alignItems: 'center'
        },
        scrollViewContainer: {
            flex: 1,
            padding: SIZES.medium,
            paddingTop: 0,
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        mainContainer: {
            flex: 1,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            width: '100%',
            rowGap: 20
        },
        gifContainer: {
            width: '70%',
            borderColor: 'white'
        },
        widthFull: {
            width: '100%'
        },
        introContainer: {
            rowGap: SIZES.xSmall - 4
        },
        introPrimaryText: {
            fontSize: SIZES.xxLarge,
            textAlign: 'center',
            color: THEME[mode].text.white
        },
        intoSecText: {
            fontSize: SIZES.medium,
            textAlign: 'center',
            color: THEME[mode].text.white,
            opacity: 0.7
        },
        formikFormWrapper: {
            alignItems: 'center',
            rowGap: SIZES.small,
            marginTop: SIZES.large
        },
        formikInput: {
            borderColor: THEME[mode].background.green,
            borderWidth: 1,
            width: '100%',
            padding: SIZES.xSmall,
            borderRadius: SIZES.large,
            fontSize: SIZES.medium,
            fontFamily: FONTS.medium,
            color: 'white'
        },
        formikSignInBtn: {
            backgroundColor: THEME[mode].background.green,
            marginTop: SIZES.large,
            width: '70%',
            shadowColor: THEME[mode].background.green,
            shadowOffset: {
                width: 1,
                height: 1
            },
            shadowOpacity: 0.4,
            shadowRadius: 14,
            elevation: 10,
            borderRadius: 80,
            paddingVertical: 12
        },
        formikSignInBtnText: {
            textAlign: 'center',
            fontSize: SIZES.semiLarge,
            color: THEME[mode].text.dark
        },
        rememberMeContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: SIZES.xSmall,
            marginTop: SIZES.xSmall
        },
        rememberMeCheckbox: {
            borderRadius: SIZES.large,
            borderColor: THEME[mode].background.green,
            borderWidth: 1,
            opacity: 0.9
        },
        rememberMeText: {
            fontSize: SIZES.small,
            opacity: 0.9
        },
        forgotPasswordText: {
            fontSize: SIZES.medium,
            opacity: 0.8
        }
    })

export default signInStyles
