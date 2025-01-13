import axios from 'axios'
export default defineEventHandler(async (event)=>{
try {
    const config = useRuntimeConfig(event);
    const mail = getRouterParam(event, 'mail')
    console.log('mail :>> ', mail);
const response = await axios.get(`${config.baseUrl}/users/resendActivation/${mail}`)
console.log('response :>> ', response);
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
}   
})