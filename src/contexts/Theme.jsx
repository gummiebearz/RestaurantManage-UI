import { useState, createContext, useContext } from 'react'

const ThemeContext = createContext()

export const useTheme = () => useContext(ThemeContext)

const ThemeProvider = ({ children }) => {
    const [themeMode, setThemeMode] = useState('DARK')

    const toggleThemeMode = () => {
        setThemeMode((prev) => (prev === 'DARK' ? 'LIGHT' : 'DARK'))
    }

    return (
        <ThemeContext.Provider value={{ themeMode, toggleThemeMode }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
