import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import Constants from 'expo-constants'

const httpLink = createHttpLink({
    uri: 'http://' + Constants.manifest.extra.IP + '/secured'
})

const createApolloClient = (authStorage) => {
    const authLink = setContext(async (_, { headers }) => {
        try {
            const accessToken = await authStorage.getAccessToken('token')
            return {
                headers: {
                    ...headers,
                    authorization: !accessToken ? '' : `Bearer ${accessToken}`
                }
            }
        } catch (error) {
            console.error('Error creating Apollo Client:', error)
            return { headers }
        }
    })

    return new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache({
            // This creates side-effects for fragments
            // addTypename: false // Remove __typename which fails mutations
        })
    })
}

export default createApolloClient
