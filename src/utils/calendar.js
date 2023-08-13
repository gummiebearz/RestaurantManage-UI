import { CalendarUtils } from 'react-native-calendars'
import { padStart } from 'lodash'
import nativeMoment from 'moment'

nativeMoment.updateLocale('en', {
    week: {
        dow: 1 // Monday is the first day of week
    }
})

export const moment = nativeMoment

const today = new Date()

/** Get datetime from today + or - offset */
export const getDate = (offset = 0) => {
    return CalendarUtils.getCalendarDateString(
        new Date().setDate(today.getDate() + offset)
    )
}

/** Format time into HH:MM given hours and minutes */
export const formatTime = (hours, minutes) => {
    const paddedHrs = padStart(hours, 2, '0')
    const paddedMins = padStart(minutes, 2, '0')
    return `${paddedHrs}:${paddedMins}`
}

export const formatDate = (value, format = 'YYYY-MM-DD') => {
    return moment(value).utc().format(format)
}
