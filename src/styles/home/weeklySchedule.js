import { StyleSheet } from 'react-native'
import { THEME, SIZES } from '../../constants'
import commonStyle from '../commonStyle'

const weeklyScheduleStyles = (mode = 'DARK') =>
    StyleSheet.create({
        safeAreaContainer: {
            ...commonStyle(mode).safeAreaContainer
        },
        scrollViewContainer: {
            paddingTop: SIZES.semiLarge
        },
        introContainer: {
            padding: SIZES.medium
        },
        introPrimaryText: {
            fontSize: SIZES.xLarge + 3
        },
        introSecText: {
            fontSize: SIZES.medium,
            opacity: 0.6
        },
        scheduleContainer: {
            rowGap: SIZES.xxLarge,
            padding: SIZES.medium,
            paddingTop: SIZES.xxxLarge
        },
        shiftsTimeDivider: {
            borderBottomColor: THEME[mode].background.green,
            borderWidth: 1,
            opacity: 0.6
        },
        shiftsContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        shiftsTimeTextContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: THEME[mode].background.secondary,
            borderRadius: SIZES.xSmall,
            paddingHorizontal: SIZES.medium,
            paddingVertical: 2
        },
        shiftsTimeText: {
            color: THEME[mode].text.green,
            opacity: 0.8
        },
        shiftListContainer: {
            width: '80%',
            rowGap: SIZES.medium
        },
        shiftContainer: {
            backgroundColor: THEME[mode].background.tertiary,
            borderRadius: SIZES.xSmall,
            padding: SIZES.xSmall - 2,
            rowGap: 3
        },
        shiftLocationTime: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        shiftLocationText: {
            color: THEME[mode].text.green
        },
        noShiftsText: {
            opacity: 0.7,
            padding: SIZES.xSmall - 2,
            fontSize: SIZES.medium - 1
        }
    })

export default weeklyScheduleStyles
