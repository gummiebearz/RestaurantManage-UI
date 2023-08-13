import { createContext, useContext } from 'react'

const AuthStorageContext = createContext()

export const useAuthStorage = () => useContext(AuthStorageContext)

export default AuthStorageContext
