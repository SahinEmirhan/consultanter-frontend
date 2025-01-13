import axios from 'axios'
export default defineEventHandler(async (event)=>{
try {
   
    const config = useRuntimeConfig(event);
    const cookies = parseCookies(event);


    const axiosInstance = axios.create({
        baseURL: config.baseUrl,
    });
  
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${cookies.token}`;

    const response = await axiosInstance.get(`${config.baseUrl}/patient/createTemporaryFile`)

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