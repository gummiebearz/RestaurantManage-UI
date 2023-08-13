import {
    ScrollView,
    SafeAreaView,
    View,
    TouchableOpacity,
    Switch
} from 'react-native'
import { Text } from '../../components'
import { StatusBar } from 'expo-status-bar'
import { useAuth } from '../../contexts/Auth'

import { THEME } from '../../constants'
import {
    MaterialCommunityIcons,
    FontAwesome,
    SimpleLineIcons
} from '@expo/vector-icons'

import styles from '../../styles/home/account'
import { useTheme } from '../../contexts/Theme'

import { useQuery, useMutation } from '@apollo/client'
import ACCOUNT from '../../graphql/account'

const employee = {
    firstName: 'A',
    lastName: 'B',
    phoneNumber: '+1-289-349-1293',
    email: 'abc@gmail.com',
    employeeNumber: '12984394839'
}

const AccountScreen = () => {
    const { signOut } = useAuth()
    const { themeMode } = useTheme()

    const accountResult = useQuery(ACCOUNT.GET_ACCOUNT)
    const [updateNotificationSettings] = useMutation(
        ACCOUNT.UPDATE_NOTIFICATION_SETTINGS,
        {
            refetchQueries: [{ query: ACCOUNT.GET_ACCOUNT }]
        }
    )

    if (accountResult.loading && !accountResult.error) return null

    const details = accountResult?.data?.getAccount

    // return (
    //     <View style={styles(themeMode).viewContainer}>
    //         <StatusBar style='dark' />
    //         <View style={styles(themeMode).headerContainer}>
    //             <Text variant='bold' style={styles(themeMode).headerText}>
    //                 Account
    //             </Text>
    //         </View>
    //         <SafeAreaView style={styles(themeMode).safeAreaContainer}>
    //             <ScrollView style={styles(themeMode).scrollViewContainer}>
    //                 <View style={styles(themeMode).employeeContainer}>
    //                     <Text
    //                         variant='semiBold'
    //                         style={styles(themeMode).employeeName}
    //                     >
    //                         {details.employee.firstName}{' '}
    //                         {details.employee.lastName}
    //                     </Text>
    //                     <Text
    //                         variant='bold'
    //                         style={styles(themeMode).employeeNumber}
    //                     >
    //                         Employee# {details.employee.employeeNumber}
    //                     </Text>
    //                     <View style={styles(themeMode).employeeEmailContainer}>
    //                         <MaterialCommunityIcons
    //                             name='email'
    //                             size={24}
    //                             color='white'
    //                         />
    //                         <Text
    //                             variant='medium'
    //                             style={styles(themeMode).employeeEmail}
    //                         >
    //                             {details.employee.email}
    //                         </Text>
    //                     </View>
    //                     <View style={styles(themeMode).employeePhoneContainer}>
    //                         <FontAwesome name='phone' size={24} color='white' />
    //                         <Text style={styles(themeMode).employeePhone}>
    //                             {details.employee.phoneNumber}
    //                         </Text>
    //                     </View>
    //                 </View>
    //                 <View style={styles(themeMode).notificationContainer}>
    //                     <View
    //                         style={styles(themeMode).notificationTextContainer}
    //                     >
    //                         <Text
    //                             variant='bold'
    //                             style={
    //                                 styles(themeMode).notificationPrimaryText
    //                             }
    //                         >
    //                             Notifications
    //                         </Text>
    //                         <Text style={styles(themeMode).notificationSecText}>
    //                             Receive updates about assigned shifts, and many
    //                             more
    //                         </Text>
    //                     </View>
    //                     <View
    //                         style={
    //                             styles(themeMode).notificationOptionsContainer
    //                         }
    //                     >
    //                         <View
    //                             style={{
    //                                 ...styles(themeMode)
    //                                     .notificationOptionContainer,
    //                                 ...styles(themeMode)
    //                                     .notificationOptionDivider
    //                             }}
    //                         >
    //                             <Text
    //                                 variant='medium'
    //                                 style={
    //                                     styles(themeMode).notificationOptionText
    //                                 }
    //                             >
    //                                 System
    //                             </Text>
    //                             <Switch
    //                                 trackColor={{
    //                                     false: THEME[themeMode].background
    //                                         .secondary,
    //                                     true: THEME[themeMode].background.green
    //                                 }}
    //                                 thumbColor={
    //                                     details.settings.notifications.system
    //                                         ? THEME[themeMode].background
    //                                               .tertiary
    //                                         : '#f4f3f4'
    //                                 }
    //                                 ios_backgroundColor='#3e3e3e'
    //                                 onValueChange={() => {
    //                                     updateNotificationSettings({
    //                                         variables: {
    //                                             notificationSettings: {
    //                                                 system: !details.settings
    //                                                     .notifications.system,
    //                                                 sms: details.settings
    //                                                     .notifications.sms,
    //                                                 email: details.settings
    //                                                     .notifications.email
    //                                             }
    //                                         }
    //                                     })
    //                                 }}
    //                                 value={
    //                                     details.settings.notifications.system
    //                                 }
    //                             />
    //                         </View>
    //                         <View
    //                             style={{
    //                                 ...styles(themeMode)
    //                                     .notificationOptionContainer,
    //                                 ...styles(themeMode)
    //                                     .notificationOptionDivider
    //                             }}
    //                         >
    //                             <Text
    //                                 variant='medium'
    //                                 style={
    //                                     styles(themeMode).notificationOptionText
    //                                 }
    //                             >
    //                                 SMS
    //                             </Text>
    //                             <Switch
    //                                 trackColor={{
    //                                     false: THEME[themeMode].background
    //                                         .secondary,
    //                                     true: THEME[themeMode].background.green
    //                                 }}
    //                                 thumbColor={
    //                                     details.settings.notifications.sms
    //                                         ? THEME[themeMode].background
    //                                               .tertiary
    //                                         : '#f4f3f4'
    //                                 }
    //                                 ios_backgroundColor='#3e3e3e'
    //                                 onValueChange={() => {
    //                                     updateNotificationSettings({
    //                                         variables: {
    //                                             notificationSettings: {
    //                                                 system: details.settings
    //                                                     .notifications.system,
    //                                                 sms: !details.settings
    //                                                     .notifications.sms,
    //                                                 email: details.settings
    //                                                     .notifications.email
    //                                             }
    //                                         }
    //                                     })
    //                                 }}
    //                                 value={details.settings.notifications.sms}
    //                             />
    //                         </View>
    //                         <View
    //                             style={
    //                                 styles(themeMode)
    //                                     .notificationOptionContainer
    //                             }
    //                         >
    //                             <Text
    //                                 variant='medium'
    //                                 style={
    //                                     styles(themeMode).notificationOptionText
    //                                 }
    //                             >
    //                                 Email
    //                             </Text>
    //                             <Switch
    //                                 trackColor={{
    //                                     false: THEME[themeMode].background
    //                                         .secondary,
    //                                     true: THEME[themeMode].background.green
    //                                 }}
    //                                 thumbColor={
    //                                     details.settings.notifications.email
    //                                         ? THEME[themeMode].background
    //                                               .tertiary
    //                                         : '#f4f3f4'
    //                                 }
    //                                 ios_backgroundColor='#3e3e3e'
    //                                 onValueChange={() => {
    //                                     updateNotificationSettings({
    //                                         variables: {
    //                                             notificationSettings: {
    //                                                 system: details.settings
    //                                                     .notifications.system,
    //                                                 sms: details.settings
    //                                                     .notifications.sms,
    //                                                 email: !details.settings
    //                                                     .notifications.email
    //                                             }
    //                                         }
    //                                     })
    //                                 }}
    //                                 value={details.settings.notifications.email}
    //                             />
    //                         </View>
    //                     </View>
    //                 </View>
    //                 <View style={styles(themeMode).signOutBtnContainer}>
    //                     <TouchableOpacity
    //                         style={styles(themeMode).signOutBtn}
    //                         onPress={signOut}
    //                     >
    //                         <SimpleLineIcons
    //                             name='logout'
    //                             style={styles(themeMode).signOutBtnIcon}
    //                         />
    //                         <Text style={styles(themeMode).signOutBtnText}>
    //                             Sign Out
    //                         </Text>
    //                     </TouchableOpacity>
    //                 </View>
    //             </ScrollView>
    //         </SafeAreaView>
    //     </View>
    // )
    return (
        <View>
            <Text>Account</Text>
        </View>
    )
}

export default AccountScreen
