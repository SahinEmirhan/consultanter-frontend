import axios from 'axios'
export default defineEventHandler( async(event) => {
    try{
        const config = useRuntimeConfig(event);
        const cookie = parseCookies(event);

        const response = await axios.get(`${config.baseUrl}/api/case/mine`, {
            headers: {
                'Cookie':`JSESSIONID=${cookie['JSESSIONID']}`
            },
            withCredentials: true 
    })
    if(response.status == 202)
        {
            console.log("response status is 202")
            return response.data.data
        }
    }
    catch(error){
        console.log(error)
    }
})