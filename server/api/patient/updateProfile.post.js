import axios from 'axios'
import {useCookie} from ''
export default defineEventHandler(async (event)=>{
try {
   
    const config = useRuntimeConfig(event);
    const cookie = parseCookies(event);

    const param = await readBody(event)

    
    const response = await axios.post(`${config.baseUrl}/api/patient/update`, param,{
        headers: {
            'Cookie':`JSESSIONID=${cookie['JSESSIONID']}`
        },
        withCredentials: true
    })

    if(response.data.success)
    {
        return response.data;
    }
    else{
        return {success: false}
    }

 
    } catch(error) {
        
        console.log(error.response.data)
    }

    })