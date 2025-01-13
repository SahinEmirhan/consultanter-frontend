import axios from 'axios'
export default defineEventHandler(async(event) => {
    try{
        const cookies = parseCookies(event)
        const config = useRuntimeConfig(event)

        
        const axiosInstance = axios.create({
            baseURL: config.baseUrl,
          });
          
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${cookies.token}`;


          const response = await axiosInstance.get('/users/isAdmin/');

        
        if(response.status == 200)
        {
            return response.data
        }
    } catch(error) {

        console.log(error.response.data)

        
    }
})