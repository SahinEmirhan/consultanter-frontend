import axios from 'axios'
import {useCookie} from ''
export default defineEventHandler(async (event)=>{
try {
   
    const config = useRuntimeConfig(event);

    const param = await readBody(event)

    const cookie = parseCookies(event)


    console.log(`${config.baseUrl}/api/case/rate/${param.id}`)

    console.log(param)


    const response = await axios.post(`${config.baseUrl}/api/case/rate/${param.id}`, param,
        {
            headers: {
                'Cookie':`JSESSIONID=${cookie['JSESSIONID']}`
            },
            withCredentials: true
        }
    )

    const response2 = await axios.post(`${config.baseUrl}/api/case/comment/${param.id}`, param,{
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
            return null
        }

    
    } catch(error) {
        console.log(error.response.data)
    }

})