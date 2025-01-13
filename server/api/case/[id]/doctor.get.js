import axios from 'axios'

export default defineEventHandler(async (event) => {
    try{
        const config = useRuntimeConfig(event);
        const cookie = parseCookies(event);
        const id = getRouterParam(event, 'id')

        console.log(id)

    console.log("istek atıldı nuxt")
    const response = await axios.get(`${config.baseUrl}/api/case/${id}/doctor`, {
            headers: {
                'Cookie': `JSESSIONID=${cookie['JSESSIONID']}`
            },
            withCredentials: true
        })
        console.log("response => " + response)
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