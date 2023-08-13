import { gql } from '@apollo/client'

const GET_EVENTS_BETWEEN_DATES = gql`
    query getEventsBetweenDates($startDate: Date!, $endDate: Date!) {
        getEventsBetweenDates(startDate: $startDate, endDate: $endDate) {
            id
            eventType
            contract {
                ... on WeddingContract {
                    date
                    location {
                        id
                        code
                    }
                    startTime {
                        hours
                        minutes
                    }
                }
                ... on PartyContract {
                    date
                    location {
                        id
                        code
                    }
                    startTime {
                        hours
                        minutes
                    }
                }
            }
        }
    }
`

export default {
    GET_EVENTS_BETWEEN_DATES
}
