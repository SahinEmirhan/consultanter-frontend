import axios from 'axios'
export default defineEventHandler(async (event) => {
    try {
        const cookie = parseCookies(event)
        const config = useRuntimeConfig(event)
        const id = getRouterParam(event, 'id')



        const response = await axios.get(`${config.baseUrl}/api/admin/${id}/detail`, {
            headers: {
                'Cookie': `JSESSIONID=${cookie['JSESSIONID']}`
            },
            withCredentials: true
        })

        if (response.status == 200) {
            return response.data
        }
        else {
            return null
        }
    } catch (error) {

        console.log("error :", error)


    }
})