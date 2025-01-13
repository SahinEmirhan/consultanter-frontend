import axios from 'axios'

export default defineEventHandler(async (event) => {
    try{
        const config = useRuntimeConfig(event);
        const param = await readBody(event);
        const cookie = parseCookies(event);

    
    const response = await axios.post(`${config.baseUrl}/api/complaint/create`, param, {
            headers: {
                'Cookie': `JSESSIONID=${cookie['JSESSIONID']}`
            },
            withCredentials: true
        })

    

        console.log(response.data)

        if (response.data.success) {
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