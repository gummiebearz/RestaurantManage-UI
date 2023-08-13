import AsyncStorage from '@react-native-async-storage/async-storage'

class AuthStorage {
    constructor(namespace = 'auth') {
        this.namespace = namespace
    }

    async getAccessToken(name) {
        const rawToken = await AsyncStorage.getItem(`${this.namespace}.${name}`)
        return rawToken ? JSON.parse(rawToken) : null
    }

    async setAccessToken(name, value) {
        const existingToken = await this.getAccessToken(name)
        if (!existingToken) {
            await AsyncStorage.setItem(
                `${this.namespace}.${name}`,
                JSON.stringify(value)
            )
        } else {
            // Replace existing value
            await AsyncStorage.mergeItem(`${this.namespace}.${name}`, value)
        }
    }

    async removeAccessToken(name) {
        await AsyncStorage.removeItem(`${this.namespace}.${name}`)
    }

    async clearStorage() {
        await AsyncStorage.multiRemove(['token', 'username', 'userRole'])
    }
}

export default AuthStorage
