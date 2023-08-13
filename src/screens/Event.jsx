import { View } from 'react-native'
import { Text } from '../components'

const EventScreen = ({ route }) => {
    return (
        <View>
            <Text>Event Screen {route || null}</Text>
        </View>
    )
}

export default EventScreen
