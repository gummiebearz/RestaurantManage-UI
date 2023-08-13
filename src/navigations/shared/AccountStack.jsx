import { createStackNavigator } from '@react-navigation/stack'
import { ROUTE } from '../../constants'
import { AccountScreen } from '../../screens/home'
import { ScreenHeaderBtn } from '../../components'

import ARROW_LEFT from '../../../assets/icons/left.png'
import { useNavigation } from '@react-navigation/native'

const Stack = createStackNavigator()

const AccountStack = () => {
    const router = useNavigation()
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={ROUTE.SHARED.ACCOUNT}
                component={AccountScreen}
                options={{
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            dimension='60%'
                            iconUrl={ARROW_LEFT}
                            handlePress={() => router.goBack()}
                        />
                    )
                }}
            />
        </Stack.Navigator>
    )
}

export default AccountStack
