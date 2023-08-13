import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import { SIZES, THEME } from '../constants'
import { useTheme } from '../contexts/Theme'

const ScreenHeaderBtn = ({ iconUrl, dimension, handlePress }) => {
    const { themeMode } = useTheme()
    return (
        <TouchableOpacity
            style={styles(themeMode).btnContainer}
            onPress={handlePress}
        >
            <Image
                source={iconUrl}
                resizeMode='cover'
                style={styles(themeMode).btnImg(dimension)}
            />
        </TouchableOpacity>
    )
}

export default ScreenHeaderBtn

const styles = (themeMode) =>
    StyleSheet.create({
        btnContainer: {
            width: 40,
            height: 40,
            backgroundColor:
                themeMode === 'DARK'
                    ? THEME[themeMode].background.green
                    : THEME[themeMode].background.secondary,
            borderRadius: SIZES.small / 1.25,
            justifyContent: 'center',
            alignItems: 'center'
        },
        btnImg: (dimension) => ({
            width: dimension,
            height: dimension,
            borderRadius: SIZES.small / 1.25
        })
    })
