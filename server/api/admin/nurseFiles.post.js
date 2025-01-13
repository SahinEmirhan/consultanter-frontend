import axios from 'axios'
export default defineEventHandler(async(event) => {
    try{
        const cookie = parseCookies(event)
        const config = useRuntimeConfig(event)
        const param = await readBody(event)


          const response = await axios.post(`${config.baseUrl}/api/admin/update-department`, param, {
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

        return error.response.data

        
    }
})