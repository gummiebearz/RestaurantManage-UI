import { useState, createContext, useContext, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ROUTES, ROUTE } from '../constants'
import auth from '../api/auth'
import { useAuthStorage } from './AuthStorage'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

const useProtectedRoute = (isAuthenticated, router) => {
    useEffect(() => {
        if (!isAuthenticated) router.navigate(ROUTE.AUTH.SIGN_IN)
        else {
            router.navigate(ROUTE.EMP.WEEKLY_SCHEDULE)
            // router.navigate(ROUTES.AUTH.SIGN_IN)
        }
    }, [isAuthenticated])
}

const AuthProvider = ({ children }) => {
    const { authStorage } = useAuthStorage()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [userRole, setuserRole] = useState(null)
    const [user, setUser] = useState(null)
    const router = useNavigation()

    useEffect(() => {
        const findSavedToken = async () => {
            await authStorage.removeAccessToken('username')
            await authStorage.removeAccessToken('userRole')
            await authStorage.removeAccessToken('token')
            await authStorage.removeAccessToken('user')

            const savedToken = await authStorage.getAccessToken('token')
            const saveduserRole = await authStorage.getAccessToken(
                'useruserRole'
            )
            const savedUser = await authStorage.getAccessToken('user')
            if (savedToken && saveduserRole && savedUser) {
                setIsAuthenticated((_prev) => true)
                setuserRole((_prev) => saveduserRole)
                setUser((_prev) => savedUser)
            }
        }

        findSavedToken()
    }, [])

    // useProtectedRoute(isAuthenticated, router)

    const signIn = async ({ username, password, rememberMe }) => {
        // await authStorage.removeAccessToken('username')
        // await authStorage.removeAccessToken('userRole')
        // await authStorage.removeAccessToken('token')
        // await authStorage.removeAccessToken('user')

        // const response = {
        //     msg: '',
        //     passed: false
        // }

        // try {
        //     const payload = { username, password }
        //     const result = await auth.authenticate({ ...payload })

        //     if (result.status === 200 && result.data) {
        //         response.passed = true

        //         setIsAuthenticated((_prev) => true)
        //         setuserRole((_prev) => result.data.user.userRole)

        //         const { user, token } = result.data

        //         await authStorage.setAccessToken('userRole', user.userRole)
        //         await authStorage.setAccessToken('user', user)
        //         await authStorage.setAccessToken('token', token)
        //         await authStorage.setAccessToken('username', payload.username)
        //     } else response.msg = 'Invalid username and/or password'
        // } catch (error) {
        //     response.passed = false
        //     response.msg = error.message || 'Internal server error'
        // }

        // return response
        setIsAuthenticated(true)
        setuserRole('Employee')
        router.navigate(ROUTE.EMP.WEEKLY_SCHEDULE_DRAWER)
    }

    const signOut = async () => {
        setIsAuthenticated((_prev) => false)
        setuserRole((_prev) => null)
        setUser((_prev) => null)
        await authStorage.removeAccessToken('token')
        await authStorage.removeAccessToken('user')
        await authStorage.removeAccessToken('userRole')
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                userRole,
                user,
                signIn,
                signOut
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
