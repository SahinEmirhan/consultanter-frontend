import axios from 'axios'
export default defineEventHandler(async (event) => {
    try {
        const cookie = parseCookies(event)
        const config = useRuntimeConfig(event)
        const param = await readBody(event)

        const response = await axios.post(`${config.baseUrl}/api/admin/approve/${param.id}`, param, {
            headers: {
                'Cookie': `JSESSIONID=${cookie['JSESSIONID']}`
            },
            withCredentials: true
        });
        console.log(response.data)

        if (response.data.success) {
            return response.data
        }
    } catch (error) {
        console.log(error)

        console.log(error.response.data)
        return error.response.data


    }
})