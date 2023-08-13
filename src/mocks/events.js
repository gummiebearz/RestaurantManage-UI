import { getDate } from '../utils/calendar'

export default [
    {
        date: `${getDate(+2)}`,
        start: {
            hours: 18,
            minutes: 30
        },
        end: {
            hours: 21,
            minutes: 0
        },
        location: 'Location 3',
        roomType: 'BC',
        description: 'Party Event'
    },
    {
        date: `${getDate(+2)}`,
        start: {
            hours: 9,
            minutes: 30
        },
        end: {
            hours: 11,
            minutes: 0
        },
        location: 'Location 3',
        roomType: 'A',
        description: 'Party Event'
    },
    {
        date: `${getDate(+2)}`,
        start: {
            hours: 10,
            minutes: 0
        },
        end: {
            hours: 12,
            minutes: 30
        },
        location: 'Location 3',
        roomType: 'ABC',
        description: 'Party Event'
    },
    {
        date: `${getDate(+1)}`,
        start: {
            hours: 8,
            minutes: 0
        },
        end: {
            hours: 10,
            minutes: 30
        },
        location: 'Location 2',
        description: 'Party Event'
    },
    {
        date: `${getDate(+1)}`,
        start: {
            hours: 18,
            minutes: 30
        },
        end: {
            hours: 21,
            minutes: 30
        },
        location: 'Location 1',
        roomType: 'Main',
        description: 'Wedding'
    },
    {
        date: `${getDate(-1)}`,
        start: {
            hours: 10,
            minutes: 0
        },
        end: {
            hours: 12,
            minutes: 30
        },
        location: 'Location 1',
        roomType: 'VIP',
        description: 'Party Event Last'
    },
    {
        date: `${getDate()}`,
        start: {
            hours: 10,
            minutes: 0
        },
        end: {
            hours: 12,
            minutes: 30
        },
        location: 'Location 1',
        roomType: 'VIP',
        description: 'Party Event Last'
    },
    {
        date: `${getDate()}`,
        start: {
            hours: 8,
            minutes: 25
        },
        end: {
            hours: 9,
            minutes: 30
        },
        location: 'Location 2',
        roomType: null,
        description: 'Wedding'
    },
    {
        date: `${getDate()}`,
        start: {
            hours: 14,
            minutes: 30
        },
        end: {
            hours: 15,
            minutes: 30
        },
        location: 'Location 1',
        roomType: 'Main',
        description: 'Party Event Last'
    }
]
