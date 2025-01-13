import axios from 'axios'
export default defineEventHandler(async (event)=>{
try {


    const config = useRuntimeConfig(event);

    const param = await readBody(event)


    const response = await axios.post(`${config.baseUrl}/api/users/admin/register`, param)

    console.log(response.data)
    if(response.data.success)
    {
        return response.data;
    }
    else{
        return response.data
    }

 
} catch(error) {
    console.log(error.response.data)
    return error.response.data;
}

})