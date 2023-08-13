import { useState } from 'react'
import {
    TimelineList,
    ExpandableCalendar,
    CalendarProvider,
    CalendarUtils,
    Timeline as NativeTimeline
} from 'react-native-calendars'
import { ScrollView, View, TouchableOpacity } from 'react-native'
import { Text } from '.'
import { groupBy } from 'lodash'
import { getDate } from '../utils/calendar'
import { FONTS, THEME } from '../constants'

const EVENTS = [
    {
        start: `${getDate(-1)} 09:20:00UTC`,
        end: `${getDate(-1)} 12:00:00UTC`,
        title: 'Merge Request to React Native Calendars',
        // summary: 'Merge Timeline Calendar to React Native Calendars'
        summary: JSON.stringify({
            description: 'Hello'
        }),
        color: THEME['DARK'].button.purple
    },
    {
        start: `${getDate()} 08:15:00`,
        end: `${getDate()} 09:30:00`,
        title: 'L1 ABC',
        summary: 'Party Event',
        color: THEME['DARK'].button.purple
    },
    {
        start: `${getDate()} 08:45:00`,
        end: `${getDate()} 09:45:00`,
        title: 'Meeting BC',
        summary: 'Summary for meeting BC',
        color: THEME['DARK'].button.purple
    },
    {
        start: `${getDate()} 10:15:00`,
        end: `${getDate()} 12:30:00`,
        title: 'Meeting A',
        summary: 'Summary for meeting A',
        color: THEME['DARK'].button.purple
    },
    {
        start: `${getDate(+1)} 08:30:00`,
        end: `${getDate(+1)} 10:30:00`,
        title: 'Meeting B',
        summary: 'Summary for meeting B',
        color: THEME['DARK'].button.purple
    },
    {
        start: `${getDate()} 13:45:00`,
        end: `${getDate()} 15:45:00`,
        title: 'Meeting C',
        summary: 'Summary for meeting C',
        color: THEME['DARK'].button.purple
    },
    {
        start: `${getDate()} 22:15:00`,
        end: `${getDate(+1)} 1:30:00`,
        title: 'Meeting B',
        summary: 'Summary for meeting B',
        color: THEME['DARK'].button.purple
    }
]

const Timeline = () => {
    const [currDate, setCurrDate] = useState(getDate())
    const [events, setEvents] = useState(EVENTS)
    const [eventsByDate, setEventsByDate] = useState(
        groupBy(events, (e) => CalendarUtils.getCalendarDateString(e.start))
    )

    console.log(eventsByDate)

    return (
        <CalendarProvider
            date={currDate}
            onDateChanged={(date) => {
                console.log('Date change: ', date)
                setCurrDate(date)
            }}
            onMonthChange={(date) => console.log(date)}
            showTodayButton
            disabledOpacity={0.6}
            todayButtonStyle={{
                backgroundColor: THEME['DARK'].button.green
            }}
            theme={{
                todayButtonTextColor: THEME['DARK'].background.primary
            }}
        >
            <ExpandableCalendar
                firstDay={1}
                hideKnob
                directionalLockEnabled={true}
                allowShadow
                numberOfDays={7}
                // disableAllTouchEventsForInactiveDays
                // disableAllTouchEventsForDisabledDays
                // disableWeekScroll
                pastScrollRange={7}
                futureScrollRange={7}
                theme={
                    {
                        // calendarBackground: THEME['DARK'].button.green,
                        // textSectionTitleColor: THEME['DARK'].background.primary,
                        // textDayHeaderFontSize: 15,
                        // textDayFontFamily: FONTS.bold,
                        // textDayFontSize: 16,
                        // selectedDayBackgroundColor:
                        //     THEME['DARK'].background.primary,
                        // selectedDayTextColor: THEME['DARK'].button.green,
                        // arrowColor: THEME['DARK'].background.primary,
                        // monthTextColor: THEME['DARK'].background.primary,
                        // textMonthFontFamily: FONTS.bold,
                        // textMonthFontSize: 20,
                        // dayTextColor: THEME['DARK'].background.tertiary,
                        // textDisabledColor: THEME['DARK'].text.lightPurple
                    }
                }
            />
            <ScrollView
                style={{ padding: 16 }}
                contentContainerStyle={{ rowGap: 40, marginBottom: 20 }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >
                    <Text variant='bold'>A.M</Text>
                    <View style={{ width: '80%', rowGap: 10 }}>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                            <View
                                key={item}
                                style={{
                                    backgroundColor: 'pink',
                                    borderRadius: 10
                                }}
                            >
                                <TouchableOpacity style={{ padding: 8 }}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between'
                                        }}
                                    >
                                        <Text>Location 1</Text>
                                        <Text>8:00 - 10:00</Text>
                                    </View>
                                    <Text>Party Event</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >
                    <Text variant='bold'>P.M</Text>
                    <View style={{ width: '80%', rowGap: 10 }}>
                        <View
                            style={{
                                backgroundColor: 'pink',
                                borderRadius: 10
                            }}
                        >
                            <TouchableOpacity style={{ padding: 8 }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <Text>Location 1</Text>
                                    <Text>8:00 - 10:00</Text>
                                </View>
                                <Text>Party Event</Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                backgroundColor: 'pink',
                                borderRadius: 10
                            }}
                        >
                            <TouchableOpacity style={{ padding: 8 }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <Text>Location 1</Text>
                                    <Text>9:00 - 10:45</Text>
                                </View>
                                <Text>Party Event</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
            {/* <SafeAreaView
                style={{
                    backgroundColor: 'pink',
                    flex: 1,
                    padding: 16
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        // columnGap: 10,
                        justifyContent: 'flex-end',
                        padding: 16
                    }}
                >
                    <Text
                        style={{
                            backgroundColor: 'red',
                            height: 20 * 5 // height of 1 event block x num events
                        }}
                    >
                        A.M
                    </Text>
                    <ScrollView>
                        <Text>Meeting A.M</Text>
                        <Text>Meeting A.M</Text>
                        <Text>Meeting A.M</Text>
                        <Text>Meeting A.M</Text>
                    </ScrollView>
                </View>
                <View style={{ flexDirection: 'row', columnGap: 10 }}>
                    <View style={{ backgroundColor: 'red' }}>
                        <Text>P.M</Text>
                    </View>
                    <ScrollView>
                        <Text>Meeting P.M</Text>
                    </ScrollView>
                </View>
            </SafeAreaView> */}
            {/* <NativeTimeline
                events={eventsByDate}
                renderEvent={(event) => <Text>{event.title}</Text>}
            /> */}
            {/* <TimelineList
                events={eventsByDate}
                // showNowIndicator // Red line on the timeline marks current time
                scrollToFirst
                initialTime={{ hour: 7, minutes: 0 }}
                timelineProps={{
                    format24h: true,
                    start: 7,
                    end: 24,
                    overlapEventsSpacing: 3,
                    rightEdgeSpacing: 10,
                    styles: {
                        calendarBackground: THEME['DARK'].background.primary,
                        contentStyle: {
                            width: '100%'
                        }
                    },
                    renderEvent: (event) => (
                        <View style={{ width: '100%' }}>
                            <Text variant='bold' style={{ fontSize: 18 }}>
                                {event.title}
                            </Text>
                            <Text>{event?.summary || 'N/A'}</Text>
                        </View>
                    )
                }}
            /> */}
        </CalendarProvider>
    )
}

export default Timeline
