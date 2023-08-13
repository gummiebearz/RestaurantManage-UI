import { ScrollView, SafeAreaView, View, Switch } from 'react-native'
import { Text } from '../../components'
import { THEME } from '../../constants'

import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import { useState } from 'react'

const AccountScreen = () => {
    const [pushNoti, setPushNoti] = useState(false)

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: THEME['DARK'].background.primary,
                padding: 16
            }}
        >
            <View
                style={{
                    backgroundColor: THEME['DARK'].button.green,
                    paddingHorizontal: 16,
                    paddingBottom: 8
                }}
            >
                <Text variant='bold' style={{ fontSize: 48, color: 'black' }}>
                    Account
                </Text>
            </View>
            <ScrollView
                contentContainerStyle={{
                    flex: 1,
                    padding: 16,
                    justifyContent: 'space-between'
                }}
                scrollToOverflowEnabled
            >
                <View style={{ rowGap: 10, marginTop: 16 }}>
                    <Text variant='semiBold' style={{ fontSize: 28 }}>
                        Jason Vuong
                    </Text>
                    <Text style={{ fontSize: 16 }}>Employee# 9394502389</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            columnGap: 10,
                            alignItems: 'center'
                        }}
                    >
                        <MaterialCommunityIcons
                            name='email'
                            size={24}
                            color='white'
                        />
                        <Text variant='medium' style={{ fontSize: 16 }}>
                            npp5@gmail.com
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            columnGap: 10,
                            alignItems: 'center'
                        }}
                    >
                        <FontAwesome name='phone' size={24} color='white' />
                        <Text style={{ fontSize: 16 }}>+1-238-859-7789</Text>
                    </View>
                </View>
                <View style={{ marginBottom: 50, rowGap: 10 }}>
                    <View style={{ rowGap: 5 }}>
                        <Text variant='bold' style={{ fontSize: 28 }}>
                            System Notifications
                        </Text>
                        <Text>
                            Receive updates about assigned shifts, and many more
                        </Text>
                    </View>
                    <View style={{ rowGap: 20, marginTop: 40 }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                borderBottomColor:
                                    THEME['DARK'].background.secondary,
                                borderBottomWidth: 1.2,
                                borderRadius: 1,
                                paddingBottom: 20
                            }}
                        >
                            <Text variant='medium' style={{ fontSize: 16 }}>
                                Push Notification
                            </Text>
                            <Switch
                                trackColor={{
                                    // false: '#767577',
                                    false: THEME['DARK'].background.secondary,
                                    true: THEME['DARK'].button.green
                                }}
                                thumbColor={
                                    pushNoti
                                        ? THEME['DARK'].background.tertiary
                                        : '#f4f3f4'
                                }
                                ios_backgroundColor='#3e3e3e'
                                onValueChange={() =>
                                    setPushNoti((prev) => !prev)
                                }
                                value={pushNoti}
                            />
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                borderBottomColor:
                                    THEME['DARK'].background.secondary,
                                borderBottomWidth: 1.2,
                                borderRadius: 1,
                                paddingBottom: 20
                            }}
                        >
                            <Text variant='medium' style={{ fontSize: 16 }}>
                                Push Notification
                            </Text>
                            <Switch
                                trackColor={{
                                    // false: '#767577',
                                    false: THEME['DARK'].background.secondary,
                                    true: THEME['DARK'].button.green
                                }}
                                thumbColor={
                                    pushNoti
                                        ? THEME['DARK'].background.tertiary
                                        : '#f4f3f4'
                                }
                                ios_backgroundColor='#3e3e3e'
                                onValueChange={() =>
                                    setPushNoti((prev) => !prev)
                                }
                                value={pushNoti}
                            />
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingBottom: 20
                            }}
                        >
                            <Text variant='medium' style={{ fontSize: 16 }}>
                                Push Notification
                            </Text>
                            <Switch
                                trackColor={{
                                    // false: '#767577',
                                    false: THEME['DARK'].background.secondary,
                                    true: THEME['DARK'].button.green
                                }}
                                thumbColor={
                                    pushNoti
                                        ? THEME['DARK'].background.tertiary
                                        : '#f4f3f4'
                                }
                                ios_backgroundColor='#3e3e3e'
                                onValueChange={() =>
                                    setPushNoti((prev) => !prev)
                                }
                                value={pushNoti}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AccountScreen
