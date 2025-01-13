import axios from 'axios'
import {useCookie} from ''
export default defineEventHandler(async (event)=>{
try {
   
    const config = useRuntimeConfig(event);

    const param = await readBody(event)

    const response = await axios.post(`${config.baseUrl}/api/users/register`, param)

        if(response.data.success)
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