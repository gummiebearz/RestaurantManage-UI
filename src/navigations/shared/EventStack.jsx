import { createStackNavigator } from '@react-navigation/stack'
import EventScreen from '../../screens/Event'
import { ROUTE } from '../../constants'

const Stack = createStackNavigator()

const EventStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={ROUTE.SHARED.EVENT_STACK}
                component={EventScreen}
            />
        </Stack.Navigator>
    )
}

export default EventStack
