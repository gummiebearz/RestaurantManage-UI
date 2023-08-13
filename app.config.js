import 'dotenv/config'

export default {
    expo: {
        name: 'ui',
        slug: 'ui',
        version: '1.0.0',
        orientation: 'default',
        // 'extra' property to store ENV VARIABLES
        extra: {
            API_URL: process.env.API_URL,
            IP: process.env.IP
        },
        icon: './assets/icon.png',
        platforms: ['ios', 'android'],
        userInterfaceStyle: 'light',
        splash: {
            image: './assets/splash.png',
            resizeMode: 'contain',
            backgroundColor: '#ffffff'
        },
        assetBundlePatterns: ['**/*'],
        ios: {
            supportsTablet: true,
            config: {
                usesNonExemptEncryption: false
            }
        },
        android: {
            adaptiveIcon: {
                foregroundImage: './assets/adaptive-icon.png',
                backgroundColor: '#ffffff'
            }
        },
        web: {
            favicon: './assets/favicon.png'
        }
    }
}
