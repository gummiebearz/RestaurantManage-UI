import { useState } from 'react'
import { SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native'
import { CalendarProvider, ExpandableCalendar } from 'react-native-calendars'
import { getDate, formatTime } from '../../utils/calendar'
import weeklyScheduleStyles from '../../styles/home/weeklySchedule'
import { useTheme } from '../../contexts/Theme'
import { Text } from '../../components'
import { groupBy } from 'lodash'

import EVENTS from '../../mocks/events'
import { THEME, FONTS, SIZES } from '../../constants'

import { useQuery } from '@apollo/client'
import { GET_EMPLOYEE_SHIFTS } from '../../graphql/shift'

const WeeklyScheduleScreen = () => {
    const { themeMode } = useTheme()
    const [currDate, setCurrDate] = useState(getDate())
    const [events, setEvents] = useState(EVENTS)
    const [eventsByDate, setEventsByDate] = useState(
        groupBy(events, (e) => e.date)
    )
    const shiftsResult = useQuery(GET_EMPLOYEE_SHIFTS, {
        // variables: { date: '2023-08-18' }
    })

    if (shiftsResult.loading) return null
    const shiftsByDate = groupBy(
        shiftsResult.data.getEmployeeShifts,
        (shift) => shift.date
    )
    console.log(shiftsByDate)

    // Extract event dates from event objects into a sorted list
    // Use of Set to remove duplicates
    const eventDates = [...new Set(events.map((event) => event.date))].sort()

    const amEvents = !eventsByDate[currDate]
        ? []
        : eventsByDate[currDate]
              .filter((event) => event.start.hours < 12)
              .sort((eventA, eventB) => eventA.start.hours - eventB.start.hours)

    const pmEvents = !eventsByDate[currDate]
        ? []
        : eventsByDate[currDate]
              .filter((event) => event.start.hours >= 12)
              .sort((eventA, eventB) => eventA.start.hours - eventB.start.hours)

    const setMarkedDates = (dates) => {
        let markedObjects = {}
        dates.forEach((date) => {
            markedObjects[date] = {
                marked: true,
                type: 'dot',
                dotColor: THEME[themeMode].text.black,
                customStyles: {
                    text: {
                        color: THEME[themeMode].text.black
                    },
                    container: {
                        marginBottom: 5
                    }
                },
                startingDay: date === eventDates.at(0),
                endingDay: date === eventDates.at(-1),
                today: date === currDate
            }
        })

        return markedObjects
    }

    return (
        <SafeAreaView style={weeklyScheduleStyles(themeMode).safeAreaContainer}>
            <ScrollView
                style={weeklyScheduleStyles(themeMode).scrollViewContainer}
            >
                <View style={weeklyScheduleStyles(themeMode).introContainer}>
                    <Text
                        variant='bold'
                        style={weeklyScheduleStyles(themeMode).introPrimaryText}
                    >
                        July 24-30
                    </Text>
                    <Text style={weeklyScheduleStyles(themeMode).introSecText}>
                        Click on events to view their details
                    </Text>
                </View>
                <CalendarProvider
                    date={currDate}
                    onDateChanged={(date) => setCurrDate(date)}
                    shouldRasterizeIOS
                    disabledOpacity={0.6}
                >
                    <ExpandableCalendar
                        disablePan
                        disableScrollViewPanResponder
                        hideKnob
                        firstDay={1} // Monday is the first day of week
                        initialDate={eventDates[0]}
                        markingType='custom'
                        markedDates={setMarkedDates(eventDates)}
                        pagingEnabled
                        pastScrollRange={7}
                        futureScrollRange={7}
                        // directionalLockEnabled={true}
                        allowShadow
                        disableAllTouchEventsForInactiveDays
                        disableAllTouchEventsForDisabledDays
                        hideExtraDays
                        theme={{ calendarBackground:
                                THEME[themeMode].background.green,
                            textSectionTitleColor:
                                THEME[themeMode].background.primary,
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
                            textDisabledColor:
                                THEME[themeMode].text.lightPurple,
                            todayTextColor: THEME[themeMode].text.darkGrey
                        }}
                    />
                    <View
                        style={
                            weeklyScheduleStyles(themeMode).scheduleContainer
                        }
                    >
                        <View
                            style={
                                weeklyScheduleStyles(themeMode).shiftsContainer
                            }
                        >
                            <View
                                style={
                                    weeklyScheduleStyles(themeMode)
                                        .shiftsTimeTextContainer
                                }
                            >
                                <Text
                                    variant='bold'
                                    style={
                                        weeklyScheduleStyles(themeMode)
                                            .shiftsTimeText
                                    }
                                >
                                    A.M -{' '}
                                    {shiftsByDate['1692057600000']
                                        .workingHour === 'AM' && 'True'}
                                </Text>
                            </View>
                            <View
                                style={
                                    weeklyScheduleStyles(themeMode)
                                        .shiftListContainer
                                }
                            >
                                {!amEvents.length ? (
                                    <Text
                                        variant='medium'
                                        style={
                                            weeklyScheduleStyles(themeMode)
                                                .noShiftsText
                                        }
                                    >
                                        No events available
                                    </Text>
                                ) : (
                                    amEvents.map((event, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={
                                                weeklyScheduleStyles(themeMode)
                                                    .shiftContainer
                                            }
                                        >
                                            <View
                                                style={
                                                    weeklyScheduleStyles(
                                                        themeMode
                                                    ).shiftLocationTime
                                                }
                                            >
                                                <Text
                                                    variant='bold'
                                                    style={
                                                        weeklyScheduleStyles(
                                                            themeMode
                                                        ).shiftLocationText
                                                    }
                                                >
                                                    {event.location}
                                                    {event.roomType &&
                                                        ` - ${event.roomType}`}
                                                </Text>
                                                <Text variant='semiBold'>
                                                    {formatTime(
                                                        event.start.hours,
                                                        event.start.minutes
                                                    )}
                                                </Text>
                                            </View>
                                            <Text variant='medium'>
                                                {event.description}
                                            </Text>
                                        </TouchableOpacity>
                                    ))
                                )}
                            </View>
                        </View>
                        <View
                            style={
                                weeklyScheduleStyles(themeMode)
                                    .shiftsTimeDivider
                            }
                        ></View>
                        <View
                            style={
                                weeklyScheduleStyles(themeMode).shiftsContainer
                            }
                        >
                            <View
                                style={
                                    weeklyScheduleStyles(themeMode)
                                        .shiftsTimeTextContainer
                                }
                            >
                                <Text
                                    variant='bold'
                                    style={
                                        weeklyScheduleStyles(themeMode)
                                            .shiftsTimeText
                                    }
                                >
                                    P.M
                                </Text>
                            </View>
                            <View
                                style={
                                    weeklyScheduleStyles(themeMode)
                                        .shiftListContainer
                                }
                            >
                                {!pmEvents.length ? (
                                    <Text
                                        variant='medium'
                                        style={
                                            weeklyScheduleStyles(themeMode)
                                                .noShiftsText
                                        }
                                    >
                                        No events available
                                    </Text>
                                ) : (
                                    pmEvents.map((event, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={
                                                weeklyScheduleStyles(themeMode)
                                                    .shiftContainer
                                            }
                                        >
                                            <View
                                                style={
                                                    weeklyScheduleStyles(
                                                        themeMode
                                                    ).shiftLocationTime
                                                }
                                            >
                                                <Text
                                                    variant='bold'
                                                    style={
                                                        weeklyScheduleStyles(
                                                            themeMode
                                                        ).shiftLocationText
                                                    }
                                                >
                                                    {event.location}
                                                    {event.roomType &&
                                                        ` - ${event.roomType}`}
                                                </Text>
                                                <Text variant='semiBold'>
                                                    {formatTime(
                                                        event.start.hours,
                                                        event.start.minutes
                                                    )}
                                                </Text>
                                            </View>
                                            <Text variant='medium'>
                                                {event.description}
                                            </Text>
                                        </TouchableOpacity>
                                    ))
                                )}
                            </View>
                        </View>
                    </View>
                </CalendarProvider>
            </ScrollView>
        </SafeAreaView>
    )
}

export default WeeklyScheduleScreen
