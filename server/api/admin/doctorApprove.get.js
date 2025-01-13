import axios from 'axios'
export default defineEventHandler(async(event) => {
    try{
        const cookie = parseCookies(event)
        const config = useRuntimeConfig(event)

          const response = await axios.get(`${config.baseUrl}/api/admin/doctors/pending-approval`, {
            headers: {
                'Cookie':`JSESSIONID=${cookie['JSESSIONID']}`
            },
            withCredentials: true
        });

        
        if(response.data.success)
        {
            return response.data.data
        }
    } catch(error) {

        console.log(error.response.data)

        
    }
})