import axios from 'axios'
export default defineEventHandler(async (event) => {
   try {
    const cookie = parseCookies(event);
    const config = useRuntimeConfig(event);
    const id = getRouterParam(event, 'id')
      
      const response = await axios.get(`${config.baseUrl}/api/doctor/case/${id}/detail/dicom`,{
        headers: {
            'Cookie':`JSESSIONID=${cookie['JSESSIONID']}`
        },
        withCredentials: true
    });



    console.log(response.data)
            
      if(response.status == 200)
      {
        return response.data
      }

    
}catch(error) {
    console.log(error.message)
   }
})