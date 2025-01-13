import axios from 'axios'
export default defineEventHandler(async(event) => {
    try{
        const config = useRuntimeConfig(event)
        

          const cookie = parseCookies(event);


          const response = await axios.get(`${config.baseUrl}/api/doctor/profile`, {
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

        
    }
})