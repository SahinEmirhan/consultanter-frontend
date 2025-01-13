import axios from 'axios'
import { useCookie } from ''
export default defineEventHandler(async (event) => {
    try {

        const config = useRuntimeConfig(event);
        const cookies = parseCookies(event);

        const id = getRouterParam(event, 'id')

        const param = await readBody(event)

        console.log(param)

        const cookie = parseCookies(event);
        const response = await axios.post(`${config.baseUrl}/api/doctor/make-diagnosis/${id}`, param, {
            headers: {
                'Cookie': `JSESSIONID=${cookie['JSESSIONID']}`
            },
            withCredentials: true
        })
        console.log(response.data)
        if (response.success) {
            return response;
        }
        else {
            return null
        }


    } catch (error) {
        console.log(error.response.data)
    }

})