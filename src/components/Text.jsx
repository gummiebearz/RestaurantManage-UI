import { Text as NativeText } from 'react-native'
import commonStyle from '../styles/commonStyle'
import { useTheme } from '../contexts/Theme'

const Text = ({ variant = 'regular', children: textValue, style }) => {
    const { themeMode } = useTheme()
    return (
        <NativeText
            style={{ ...commonStyle(themeMode).textFont(variant), ...style }}
        >
            {textValue}
        </NativeText>
    )
}

export default Text
