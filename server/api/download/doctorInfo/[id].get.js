import axios from 'axios'
export default defineEventHandler(async (event) => {
   try {
    const cookies = parseCookies(event);
    const config = useRuntimeConfig(event);
    const id = getRouterParam(event, 'id')

    const { info } = getQuery(event)


    
    if(id === 'undefined') {
      return {success: false, message: 'id has not initialized'}
    }

    const axiosInstance = axios.create({
      baseURL: config.baseUrl,
      });
      
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${cookies.token}`;


      const response = await axiosInstance.get(`/document/${info}/${id}`);
      
      const chunkSize = response.data[0].filename.metadata.totalChunk;
      
      
      if(response.status == 200)
      {
        return {chunkSize, success: true}
      }

    
}catch(error) {
    console.log(error.message)
   }
})