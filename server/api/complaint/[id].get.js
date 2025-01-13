import axios from 'axios'

export default defineEventHandler(async (event) => {
    try{
        const config = useRuntimeConfig(event);
        const cookie = parseCookies(event);
        const id = getRouterParam(event, 'id')

    const response = await axios.get(`${config.baseUrl}/api/complaint/messages/${id}`, {
            headers: {
                'Cookie': `JSESSIONID=${cookie['JSESSIONID']}`
            },
            withCredentials: true
        })

        if (response.data) {
            return response.data;
        }
        else {
            return null
        }
    }
    catch(error){
        console.log(error.response.data)
    }
} )