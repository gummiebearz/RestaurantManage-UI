import axiosInstance from '.'

export default {
    authenticate: async ({ username, password }) => {
        return await axiosInstance.post('/auth/sign-in', {
            username,
            password
        })
    }
}
