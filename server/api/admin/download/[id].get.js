import axios from 'axios'
export default defineEventHandler(async (event) => {
  try {   
    const cookies = parseCookies(event);
    const config = useRuntimeConfig(event);
    const id = getRouterParam(event, 'id');
    const query = getQuery(event)

    const axiosInstance = axios.create({
      baseURL: config.baseUrl,
      });
      
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${cookies.token}`;


      const response = await axiosInstance.get(`/document/${query.db}/${id}/${query.chunk}`, { responseType: 'arraybuffer'});      
            
      if(response.status == 200)
      {
        return response.data
      }
      
}catch(error) {
    console.log(error.message)
   }
})