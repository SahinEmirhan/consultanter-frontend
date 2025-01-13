import axios from 'axios'


export default defineEventHandler(async (event)=>{
try {
    const param = await readBody(event)

    const config = useRuntimeConfig(event);

    const cookies = parseCookies(event);


    const response = await axios.post(`${config.baseUrl}/api/patient/buy/ticket`, param,{
        headers: {
            'Cookie':`JSESSIONID=${cookies['JSESSIONID']}`
        },
        withCredentials: true
    })

    console.log(response.data)
    

    if(response.data.success)
    {
        return response.data;
    }
    else{
        return {success: false}
    }
     
} catch(error) {

    return {success: false, message: error.response.data}
}

})