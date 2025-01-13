import axios from 'axios'
export default defineEventHandler(async(event) => {
    try{
        const cookies = parseCookies(event)
        const config = useRuntimeConfig(event)
        const id = getRouterParam(event, 'id')
        console.log('response :>> ', id);
        const axiosInstance = axios.create({
            baseURL: config.baseUrl,
          });
          
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${cookies.token}`;


          const response = await axiosInstance.get(`${config.baseUrl}/doctor/approveFile/${id}`)
          console.log('response :>> ', response);
            if(response.status == 200)
            {
                return response.data
            }
            else{
                return null
            }
    } catch(error) {

        console.log("error :" , error)

        
    }
})