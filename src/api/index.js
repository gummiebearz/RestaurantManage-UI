import axios from 'axios'
import Constants from 'expo-constants'

const axiosInstance = axios.create({
    baseURL: 'http://' + Constants.manifest.extra.IP
})
export default axiosInstance
