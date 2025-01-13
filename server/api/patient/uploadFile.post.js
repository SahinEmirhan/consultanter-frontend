import axios from 'axios'
export default defineEventHandler(async (event)=>{
try {
   
    const config = useRuntimeConfig(event);
    const cookie = parseCookies(event);
    const formDataEntries = await readMultipartFormData(event);
    



    const formData = new FormData();

    formDataEntries.forEach((entry) => {
        const { name, data, filename, type } = entry;
        
        if (filename) {
            formData.append(name,new Blob([data], { type }) ,filename);
          } else {
            
            formData.append(name, data);
          }
      
      });
  
    const response = await axios.post(`${config.baseUrl}/api/upload/file`, formData,{
        headers: {
            'Cookie':`JSESSIONID=${cookie['JSESSIONID']}`
        },
        withCredentials: true
    })



    if(response.data.success)
    {
        return response.data;
    }
    else{
        return response.data
    }


    } catch(error) {
        //console.log(error)
        //console.log(error.response.data)
    }

    })