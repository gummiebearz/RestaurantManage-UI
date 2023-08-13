import { StyleSheet } from 'react-native'
import { THEME, SIZES } from '../../constants'

const accountStyles = (mode = 'DARK') =>
    StyleSheet.create({
        viewContainer: {
            flex: 1,
            backgroundColor: THEME[mode].background.primary
        },
        headerContainer: {
            backgroundColor: THEME[mode].background.green,
            padding: SIZES.medium
        },
        headerText: {
            fontSize: SIZES.xxxLarge,
            color: THEME[mode].background.dark
        },
        safeAreaContainer: {
            flex: 1
        },
        scrollViewContainer: {
            padding: SIZES.medium
        },
        employeeContainer: {
            rowGap: 10,
            marginTop: SIZES.xSmall,
            paddingTop: SIZES.xSmall
        },
        employeeName: {
            fontSize: SIZES.xxLarge,
            color: THEME[mode].text.green
        },
        employeeNumber: {
            fontSize: SIZES.medium
        },
        employeeEmailContainer: {
            flexDirection: 'row',
            columnGap: 10,
            alignItems: 'center'
        },
        employeeEmail: {
            fontSize: SIZES.medium
        },
        employeePhoneContainer: {
            flexDirection: 'row',
            columnGap: 10,
            alignItems: 'center'
        },
        employeePhone: {
            fontSize: SIZES.medium
        },
        notificationContainer: {
            marginBottom: 50,
            rowGap: 10,
            marginTop: 50,
            paddingTop: 30
        },
        notificationTextContainer: {
            rowGap: 5
        },
        notificationPrimaryText: {
            fontSize: SIZES.xxLarge,
            color: THEME[mode].text.green
        },
        notificationSecText: {
            fontSize: SIZES.medium,
            opacity: 0.6
        },
        notificationOptionsContainer: {
            rowGap: 20,
            marginTop: 40
        },
        notificationOptionContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
            // borderBottomColor: THEME[mode].background.tertiary,
            // borderBottomWidth: 1.2,
            // borderRadius: 1,
            // paddingBottom: SIZES.large
        },
        notificationOptionDivider: {
            borderBottomColor: THEME[mode].background.tertiary,
            borderBottomWidth: 1.2,
            borderRadius: 1,
            paddingBottom: SIZES.large
        },
        notificationOptionText: {
            fontSize: SIZES.medium
        },
        signOutBtnContainer: {
            marginTop: SIZES.semiMedium,
            marginBottom: SIZES.xLarge
        },
        signOutBtn: {
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: 10,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: THEME[mode].text.red,
            width: '30%',
            justifyContent: 'center',
            padding: 8
        },
        signOutBtnIcon: {
            color: THEME[mode].text.red,
            fontSize: SIZES.semiMedium
        },
        signOutBtnText: {
            color: THEME[mode].text.red,
            fontSize: SIZES.semiMedium
        }
    })

export default accountStyles
