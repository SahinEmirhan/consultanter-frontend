import axios from 'axios'
export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event);
    const cookies = parseCookies(event);
    const response = await axios.get(`${config.baseUrl}/complaint` , { data : {
        'token' : cookies.token
    }});
    if(response.status == 200)
    {
        return response.data
    }
})