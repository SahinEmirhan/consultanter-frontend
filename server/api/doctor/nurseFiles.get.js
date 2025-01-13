import axios from 'axios'
export default defineEventHandler(async(event) => {
    try{
        const cookie = parseCookies(event)
        const config = useRuntimeConfig(event)


        const response = await axios.get(`${config.baseUrl}/api/doctor/temporaryFile`, {
            headers: {
                'Cookie':`JSESSIONID=${cookie['JSESSIONID']}`
            },
            withCredentials: true
        });


        if(response.status == 200)
        {
            return response.data
        }
    } catch(error) {
        console.log(error)

        console.log(error.response.data)

        
    }
})