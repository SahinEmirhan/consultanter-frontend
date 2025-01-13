import axios from 'axios'
export default defineEventHandler(async (event)=>{
try {
    const config = useRuntimeConfig(event);
    const params = await readBody(event)
    const mail = getRouterParam(event, 'mail')
const response = await axios.post(`${config.baseUrl}/users/activate`, {email:mail , activationCode : params.activationCode})
if(response.status == 200)
{
    return response.data;
}
else
{
    return null
}

 
} catch(error) {
    console.log(error.response.data)
    return JSON.stringify(error.response.data)
}   

})