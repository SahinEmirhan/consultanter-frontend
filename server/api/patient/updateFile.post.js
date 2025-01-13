import axios from 'axios'
import {useCookie} from ''
export default defineEventHandler(async (event)=>{
try {
   
    const config = useRuntimeConfig(event);
    const cookie = parseCookies(event);

    const param = await readBody(event)

    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

    param.date = formattedDate;

    
    const response = await axios.post(`${config.baseUrl}/api/patient/createFile`, param,{
        headers: {
            'Cookie':`JSESSIONID=${cookie['JSESSIONID']}`
        },
        withCredentials: true
    })

    if(response.data)
    {
        return response.data;
    }
    else{
        return null
    }

 
    } catch(error) {
        
        console.log(error.response.data)
    }

    })