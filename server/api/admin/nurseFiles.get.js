import axios from 'axios'
export default defineEventHandler(async(event) => {
    try{
        const cookie = parseCookies(event)
        const config = useRuntimeConfig(event)

        console.log('nurseFiles')
        
          const response = await axios.get(`${config.baseUrl}/api/admin/nurseFiles`, {
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