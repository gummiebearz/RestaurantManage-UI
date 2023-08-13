import styles from '../../styles/home/weeklySchedule'
import { useTheme } from '../../contexts/Theme'
import { THEME, FONTS, SIZES, ROUTES } from '../../constants'
import { moment, getDate, formatTime, formatDate } from '../../utils/calendar'

import { useQuery, useLazyQuery } from '@apollo/client'
import SHIFT from '../../graphql/shift'
import EVENT from '../../graphql/event'

import { groupBy } from 'lodash'
import { useState, useEffect } from 'react'

import {
    ScrollView,
    SafeAreaView,
    View,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'
import { Text } from '../../components'

import { CalendarProvider, ExpandableCalendar } from 'react-native-calendars'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'

import { MaterialCommunityIcons } from '@expo/vector-icons'

const WeeklyScheduleScreen = () => {
    const { themeMode } = useTheme()
    const [currDate, setCurrDate] = useState(getDate())
    const [startDate, setStartDate] = useState(moment(currDate).startOf('week'))
    const [endDate, setEndDate] = useState(moment(currDate).endOf('week'))

    // const [
    //     getShifts,
    //     { loading: lazyLoading, error: lazyError, data: lazyData }
    // ] = useLazyQuery(SHIFT.GET_SHIFTS_BETWEEN_DATES)

    // useEffect(() => {
    //     console.log(startDate)
    //     console.log(endDate)
    //     console.log(currDate)
    //     getShifts({
    //         variables: {
    //             startDate,
    //             endDate
    //         }
    //     })
    // }, [startDate, endDate])

    // if (lazyLoading || !lazyData)
    //     return (
    //         <View>
    //             <Text>Loading...</Text>
    //         </View>
    //     )

    /** Go back a week from start and end date of current week */
    const onLeftArrowPress = () => {
        setStartDate((_prev) => moment(_prev).startOf('week').subtract(1, 'w'))
        setEndDate((_prev) => moment(_prev).endOf('week').subtract(1, 'w'))
    }

    /** Go forward a week from start and end date of current week */
    const onRightArrowPress = () => {
        setStartDate((_prev) => moment(_prev).startOf('week').add(1, 'w'))
        setEndDate((_prev) => moment(_prev).endOf('week').add(1, 'w'))
    }

    // /** Mark active days */
    // const setMarkedDates = (dates) => {
    //     let markedObjects = {}

    //     if (!dates.length) return markedObjects

    //     dates.forEach((date) => {
    //         markedObjects[date] = {
    //             marked: true,
    //             type: 'dot',
    //             dotColor: THEME[themeMode].text.black,
    //             customStyles: {
    //                 text: { color: THEME[themeMode].text.black },
    //                 container: {
    //                     marginBottom: 5
    //                 }
    //             },
    //             startingDay: date === shiftDates.at(0),
    //             endingDay: date === shiftDates.at(-1),
    //             today: date === currDate
    //         }
    //     })

    //     return markedObjects
    // }

    // const formattedShifts = lazyData.getShiftsBetweenDates.map((shift) => ({
    //     ...shift,
    //     date: formatDate(shift.date)
    // }))

    // const weeklyShifts = groupBy(formattedShifts, (shift) => shift.date)
    // const shiftDates = [
    //     ...new Set(formattedShifts.map((shift) => shift.date))
    // ].sort()

    // console.log(weeklyShifts)

    return (
        <SafeAreaView style={styles(themeMode).safeAreaContainer}>
            <ScrollView style={styles(themeMode).scrollViewContainer}>
                <View style={styles(themeMode).introContainer}>
                    <Text
                        variant='medium'
                        style={styles(themeMode).introPrimaryText}
                    >
                        {moment(startDate).format('MMM')}{' '}
                        {moment(startDate).format('D')}
                        {' - '}
                        {moment(endDate).format('MMM')}{' '}
                        {moment(endDate).format('D')}
                    </Text>
                    <Text style={styles(themeMode).introSecText}>
                        Click on events to view their details
                    </Text>
                </View>
                {/* <View>
                    <TouchableOpacity onPress={onLeftArrowPress}>
                        <Text>Go back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onRightArrowPress}>
                        <Text>Go forward</Text>
                    </TouchableOpacity>
                </View> */}
                <ShiftEventsCalendar
                    startDate={startDate}
                    endDate={endDate}
                    onCurrDateChange={setCurrDate}
                    currDate={currDate}
                    onLeftArrowPress={onLeftArrowPress}
                    onRightArrowPress={onRightArrowPress}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

const ShiftEventsCalendar = ({
    currDate,
    onCurrDateChange,
    startDate,
    endDate,
    onLeftArrowPress,
    onRightArrowPress
}) => {
    const navigator = useNavigation()
    const { themeMode } = useTheme()

    const [
        getShifts,
        {
            loading: lazyShiftLoading,
            error: lazyShiftError,
            data: lazyShiftData
        }
    ] = useLazyQuery(SHIFT.GET_SHIFTS_BETWEEN_DATES)

    const [
        getEvents,
        {
            loading: lazyEventLoading,
            error: lazyEventError,
            data: lazyEventData
        }
    ] = useLazyQuery(EVENT.GET_EVENTS_BETWEEN_DATES)

    useEffect(() => {
        console.log(startDate)
        console.log(endDate)
        console.log(currDate)
        getShifts({
            variables: {
                startDate,
                endDate
            }
        })

        getEvents({
            variables: {
                startDate,
                endDate
            }
        })
    }, [startDate, endDate])

    if (
        lazyShiftLoading ||
        !lazyShiftData ||
        lazyEventLoading ||
        !lazyEventData
    )
        return (
            <View>
                <ActivityIndicator />
            </View>
        )
    /** Mark active days */
    const setMarkedDates = (dates) => {
        let markedObjects = {}

        if (!dates.length) return markedObjects

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

    // SHIFTS //
    const formattedShifts = lazyShiftData.getShiftsBetweenDates.map(
        (shift) => ({
            ...shift,
            date: formatDate(shift.date)
        })
    )

    const weeklyShifts = groupBy(formattedShifts, (shift) => shift.date)
    const shiftDates = [
        ...new Set(formattedShifts.map((shift) => shift.date))
    ].sort()

    const workingHrsByDate = !(currDate in weeklyShifts)
        ? []
        : weeklyShifts[currDate].map((shift) => shift.workingHour)

    const locationsByDate = !(currDate in weeklyShifts)
        ? []
        : weeklyShifts[currDate].map((shift) => shift.location.id)

    // EVENTS //
    const formattedEvents = lazyEventData.getEventsBetweenDates.map(
        (event) => ({
            ...event,
            contract: {
                ...event.contract,
                date: formatDate(event.contract.date)
            }
        })
    )

    const weeklyEvents = groupBy(
        formattedEvents,
        (event) => event.contract.date
    )

    const eventsByDate = !(currDate in weeklyEvents)
        ? []
        : weeklyEvents[currDate].filter((event) =>
              locationsByDate.includes(event.contract.location.id)
          )

    const amEvents = !eventsByDate.length
        ? []
        : eventsByDate.filter((event) => event.contract.startTime.hours < 12)

    const pmEvents = !eventsByDate.length
        ? []
        : eventsByDate.filter((event) => event.contract.startTime.hours >= 12)

    console.log(weeklyShifts)
    console.log(formattedEvents)
    console.log(eventsByDate)

    return (
        <CalendarProvider
            shouldRasterizeIOS
            disabledOpacity={0.6}
            date={currDate}
            onDateChanged={onCurrDateChange}
        >
            <ExpandableCalendar
                disablePan
                disableScrollViewPanResponder
                hideKnob
                firstDay={1} // Monday is the first day of week
                markingType='custom'
                markedDates={setMarkedDates(shiftDates)}
                pagingEnabled
                allowShadow
                disableAllTouchEventsForInactiveDays
                onPressArrowLeft={() => onLeftArrowPress()}
                onPressArrowRight={() => onRightArrowPress()}
                hideExtraDays
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

            {/* <View style={styles(themeMode).scheduleContainer}>
                <View style={styles(themeMode).shiftsContainer}>
                    <View style={styles(themeMode).shiftsTimeTextContainer}>
                        <Text
                            variant='bold'
                            style={styles(themeMode).shiftsTimeText}
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
                    <View style={styles(themeMode).shiftsTimeTextContainer}>
                        <Text
                            variant='bold'
                            style={styles(themeMode).shiftsTimeText}
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
            </View> */}
            <View style={{ paddingTop: 30 }}>
                <TouchableOpacity
                    onPress={() => navigator.navigate(ROUTES.HOME.EVENT)}
                >
                    <Text>GOO</Text>
                </TouchableOpacity>
            </View>
        </CalendarProvider>
    )
}

export const WeeklyScheduleStack = () => {
    const { themeMode } = useTheme()
    const router = useNavigation()
    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name={ROUTES.HOME.HOME}
                component={WeeklyScheduleScreen}
                // options={{
                //     headerTitle: 'Weekly Schedule',
                //     drawerLabel: 'Weekly Schedule',
                //     headerShadowVisible: false,
                //     headerStyle: {
                //         backgroundColor: THEME[themeMode].background.primary
                //     },
                //     headerTintColor: THEME[themeMode].background.green,
                //     drawerIcon: ({ focused, size, color }) => (
                //         <MaterialCommunityIcons
                //             name='timetable'
                //             size={size}
                //             color={color}
                //         />
                //     ),
                //     headerRight: () => (
                //         <TouchableOpacity
                //             style={{ paddingRight: 16 }}
                //             onPress={() => router.navigate(ROUTES.HOME.ACCOUNT)}
                //         >
                //             <MaterialCommunityIcons
                //                 name='account'
                //                 size={24}
                //                 color={THEME['DARK'].background.green}
                //             />
                //         </TouchableOpacity>
                //     )
                // }}
            />
            <Stack.Screen
                name={ROUTES.HOME.EVENT}
                component={Event}
                options={{
                    headerTitle: 'HELLO',
                    headerBackTitle: 'BACK'
                }}
            />
        </Stack.Navigator>
    )
}

const Event = () => {
    const { themeMode } = useTheme()
    return (
        <SafeAreaView
            style={{
                ...styles(themeMode).safeAreaContainer,
                backgroundColor: 'pink'
            }}
        >
            <Text>Event</Text>
        </SafeAreaView>
    )
}

export default WeeklyScheduleScreen
