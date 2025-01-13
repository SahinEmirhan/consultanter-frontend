import axios from 'axios'
export default defineEventHandler(async (event) => {
   try {
    const cookies = parseCookies(event);
    const config = useRuntimeConfig(event);
    const param = await readMultipartFormData(event)
    const endpoint = param[5].data.toString()  
        
    
    const formData = new FormData();
    
	formData.append(param[0]?.name, new Blob([param[0].data], {type: param[0].type}), param[0].filename);
    
    
    formData.append(param[1]?.name, param[1].data);
    formData.append(param[2]?.name, param[2].data);
    formData.append(param[3]?.name, param[3].data);
    formData.append(param[4]?.name, param[4].data);



    const axiosInstance = axios.create({
        baseURL: config.baseUrl,
      });
      
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${cookies.token}`;
    


    const data = await axiosInstance.post(`${config.baseUrl}/document/file/${endpoint}` , formData)
    
    return data.data;



            
    
}catch(error) {
    console.log(error.message)
   }
})