import axios from 'axios'
export default defineEventHandler(async(event) => {
    try{
        const cookie = parseCookies(event)
        const config = useRuntimeConfig(event)

        
        


        const response = await axios.get(`${config.baseUrl}/api/patient/profile`,{
            headers: {
                'Cookie':`JSESSIONID=${cookie['JSESSIONID']}`
            },
            withCredentials: true
        });
    
        let cookies = response.headers['set-cookie'];

          
        if(response.status == 200)
        {
            setCookie(event , cookies)
            return response.data
        }
    } catch(error) {

        console.log(error.response.data)

        
    }
})