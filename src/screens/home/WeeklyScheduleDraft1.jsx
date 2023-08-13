import { ScrollView, SafeAreaView, View, TouchableOpacity } from 'react-native'

import { useTheme } from '../../contexts/Theme'
import { Text } from '../../components'

import { getDate, formatTime, moment, formatDate } from '../../utils/calendar'

import {
    CalendarProvider,
    ExpandableCalendar,
} from 'react-native-calendars'

import styles from '../../styles/home/weeklySchedule'
import { useState } from 'react'
import { useAuthStorage } from '../../contexts/AuthStorage'

import { useQuery, useLazyQuery } from '@apollo/client'
import SHIFT from '../../graphql/shift'
import EVENT from '../../graphql/event'

import { groupBy } from 'lodash'
import { THEME, FONTS, SIZES } from '../../constants'

const Events = ({ currDate, onCurrDateChange, shiftDates, shiftsByDate }) => {
    const { themeMode } = useTheme()
    const { data, error, loading } = useQuery(EVENT.GET_EVENTS_BETWEEN_DATES, {
        variables: {
            startDate: shiftDates.at(0),
            endDate: shiftDates.at(-1)
        }
    })

    if (loading)
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    const { getEventsBetweenDates } = data

    const locationsPerDate = !shiftDates.includes(currDate)
        ? []
        : shiftsByDate[currDate].map((shift) => shift.location.code)

    const workingHoursPerDate = !shiftDates.includes(currDate)
        ? []
        : shiftsByDate[currDate].map((shift) => shift.workingHour)

    const formattedEvents = getEventsBetweenDates.length
        ? getEventsBetweenDates.map((event) => ({
              ...event,
              contract: {
                  ...event.contract,
                  date: formatDate(event.contract.date)
              }
          }))
        : []

    const eventsByDate = groupBy(
        formattedEvents,
        (event) => event.contract.date
    )

    const eventsPerDate = !(currDate in eventsByDate)
        ? []
        : eventsByDate[currDate].filter((event) =>
              locationsPerDate.includes(event.contract.location.code)
          )

    const amEvents = !eventsPerDate.length
        ? []
        : eventsPerDate
              .filter((event) => event?.contract?.startTime.hours < 12)
              .sort(
                  (eA, eB) =>
                      eA.contract.startTime.hours - eB.contract.startTime.hours
              )

    const pmEvents = !eventsPerDate.length
        ? []
        : eventsPerDate
              .filter((event) => event?.contract?.startTime.hours >= 12)
              .sort(
                  (eA, eB) =>
                      eA.contract.startTime.hours - eB.contract.startTime.hours
              )

    const setMarkedDates = (dates) => {
        let markedObjects = {}
        dates.forEach((date) => {
            markedObjects[date] = {
                marked: true,
                type: 'dot',
                dotColor: THEME[themeMode].text.black,
                customStyles: {
                    text: { color: THEME[themeMode].text.black },
                    container: {
                        marginBottom: 5
                    }
                },
                startingDay: date === shiftDates.at(0),
                endingDay: date === shiftDates.at(-1),
                today: date === currDate
            }
        })

        return markedObjects
    }

    return (
        <CalendarProvider
            shouldRasterizeIOS
            disabledOpacity={0.6}
            date={currDate}
            onDateChanged={onCurrDateChange}
        >
            <ExpandableCalendar
                disableAllTouchEventsForDisabledDays
                disableAllTouchEventsForInactiveDays
                disableScrollViewPanResponder
                pagingEnabled
                hideExtraDays
                allowShadow
                disablePan
                hideKnob
                firstDay={1} // Monday is the first day of week
                pastScrollRange={1}
                futureScrollRange={1}
                initialDate={shiftDates[0]}
                markingType='custom'
                markedDates={setMarkedDates(shiftDates)}
                theme={{
                    calendarBackground: THEME[themeMode].background.green,
                    textSectionTitleColor: THEME[themeMode].background.primary,
                    textDayFontFamily: FONTS.bold,
                    textDayHeaderFontFamily: FONTS.semiBold,
                    selectedDayTextColor: THEME[themeMode].text.black,
                    selectedDayBackgroundColor:
                        THEME[themeMode].background.pink,
                    arrowColor: THEME[themeMode].background.primary,
                    monthTextColor: THEME[themeMode].background.primary,
                    textMonthFontFamily: FONTS.bold,
                    textMonthFontSize: SIZES.semiLarge,
                    dayTextColor: THEME[themeMode].text.lightGrey,
                    textDisabledColor: THEME[themeMode].text.lightPurple,
                    todayTextColor: THEME[themeMode].text.darkGrey
                }}
            />
            <View style={styles(themeMode).scheduleContainer}>
                <View style={styles(themeMode).shiftsContainer}>
                    <View
                        style={styles(themeMode).shiftsTimeTextContainer(
                            workingHoursPerDate.includes('AM') ||
                                workingHoursPerDate.includes('ALL_DAY')
                        )}
                    >
                        <Text
                            variant='bold'
                            style={styles(themeMode).shiftsTimeText(
                                workingHoursPerDate.includes('AM') ||
                                    workingHoursPerDate.includes('ALL_DAY')
                            )}
                        >
                            A.M
                        </Text>
                    </View>
                    <View style={styles(themeMode).shiftListContainer}>
                        {!amEvents.length ? (
                            <Text
                                variant='medium'
                                style={styles(themeMode).noShiftsText}
                            >
                                No events available
                            </Text>
                        ) : (
                            amEvents.map((event, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles(themeMode).shiftContainer}
                                >
                                    <View
                                        style={
                                            styles(themeMode).shiftLocationTime
                                        }
                                    >
                                        <Text variant='bold'>
                                            {event.contract.location.code}
                                            {event.contract.roomType &&
                                                ` - ${event.contract.roomType}`}
                                        </Text>
                                        <Text variant='semiBold'>
                                            {formatTime(
                                                event.contract.startTime.hours,
                                                event.contract.startTime.minutes
                                            )}
                                        </Text>
                                    </View>
                                    <Text variant='medium'>
                                        {event.eventType}
                                    </Text>
                                </TouchableOpacity>
                            ))
                        )}
                    </View>
                </View>
                <View style={styles(themeMode).shiftsTimeDivider}></View>
                <View style={styles(themeMode).shiftsContainer}>
                    <View
                        style={styles(themeMode).shiftsTimeTextContainer(
                            workingHoursPerDate.includes('PM') ||
                                workingHoursPerDate.includes('ALL_DAY')
                        )}
                    >
                        <Text
                            variant='bold'
                            style={styles(themeMode).shiftsTimeText(
                                workingHoursPerDate.includes('PM') ||
                                    workingHoursPerDate.includes('ALL_DAY')
                            )}
                        >
                            P.M
                        </Text>
                    </View>
                    <View style={styles(themeMode).shiftListContainer}>
                        {!pmEvents.length ? (
                            <Text
                                variant='medium'
                                style={styles(themeMode).noShiftsText}
                            >
                                No events available
                            </Text>
                        ) : (
                            pmEvents.map((event, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles(themeMode).shiftContainer}
                                >
                                    <View
                                        style={
                                            styles(themeMode).shiftLocationTime
                                        }
                                    >
                                        <Text variant='bold'>
                                            {event.contract.location.code}
                                            {event.contract.roomType &&
                                                ` - ${event.contract.roomType}`}
                                        </Text>
                                        <Text variant='semiBold'>
                                            {formatTime(
                                                event.contract.startTime.hours,
                                                event.contract.startTime.minutes
                                            )}
                                        </Text>
                                    </View>
                                    <Text variant='medium'>
                                        {event.eventType}
                                    </Text>
                                </TouchableOpacity>
                            ))
                        )}
                    </View>
                </View>
            </View>
        </CalendarProvider>
    )
}

const WeeklyScheduleScreen = () => {
    const { themeMode } = useTheme()
    const { authStorage } = useAuthStorage()

    const [currDate, setCurrDate] = useState(getDate())
    const { data, error, loading } = useQuery(SHIFT.GET_SHIFTS_BETWEEN_DATES, {
        variables: {
            startDate: moment().startOf('week'),
            endDate: moment().endOf('week')
        }
    })

    if (loading) return null

    const { getShiftsBetweenDates } = data

    const formattedShifts = getShiftsBetweenDates.map((shift) => ({
        ...shift,
        date: formatDate(shift.date)
    }))

    const shiftsByDate = groupBy(formattedShifts, (shift) => shift.date)
    const shiftDates = [
        ...new Set(formattedShifts.map((shift) => shift.date))
    ].sort()

    return (
        <SafeAreaView style={styles(themeMode).safeAreaContainer}>
            <ScrollView style={styles(themeMode).scrollViewContainer}>
                <View style={styles(themeMode).introContainer}>
                    <Text style={styles(themeMode).introPrimaryText}>
                        August 7 - 13
                    </Text>
                    <Text style={styles(themeMode).introSecText}>
                        Click on events to view their details
                    </Text>
                </View>
                <Events
                    currDate={currDate}
                    onCurrDateChange={setCurrDate}
                    shiftDates={shiftDates}
                    shiftsByDate={shiftsByDate}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

export default WeeklyScheduleScreen
