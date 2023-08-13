import { StyleSheet } from 'react-native'
import { THEME, FONTS } from '../constants'

const commonStyle = (mode = 'DARK') =>
    StyleSheet.create({
        screenHeader: {
            backgroundColor: THEME[mode].background.primary
        },

        safeAreaContainer: {
            flex: 1,
            backgroundColor: THEME[mode].background.primary
        },

        // 3 variants: bold, medium, regular
        textFont: (variant) => ({
            fontFamily: FONTS[variant],
            color: THEME[mode].text.white
        })
    })

export default commonStyle
