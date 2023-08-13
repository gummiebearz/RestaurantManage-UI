import { gql } from '@apollo/client'

const GET_SHIFTS_BETWEEN_DATES = gql`
    query getShiftsBetweenDates($startDate: Date!, $endDate: Date!) {
        getShiftsBetweenDates(startDate: $startDate, endDate: $endDate) {
            id
            location {
                id
                code
            }
            workingHour
            date
        }
    }
`

export default {
    GET_SHIFTS_BETWEEN_DATES
}
