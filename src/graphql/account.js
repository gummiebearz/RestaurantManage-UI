import { gql } from '@apollo/client'

const GET_ACCOUNT = gql`
    query {
        getAccount {
            id
            username
            settings {
                notifications {
                    system
                    sms
                    email
                }
            }
            employee {
                id
                employeeNumber
                firstName
                lastName
                phoneNumber
                email
            }
        }
    }
`

const UPDATE_NOTIFICATION_SETTINGS = gql`
    mutation updateNotificationSettings(
        $notificationSettings: NotificationSettingsInput!
    ) {
        updateNotificationSettings(
            notificationSettings: $notificationSettings
        ) {
            system
            sms
            email
        }
    }
`

export default {
    GET_ACCOUNT,
    UPDATE_NOTIFICATION_SETTINGS
}
