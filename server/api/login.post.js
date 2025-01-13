import axios from 'axios'

export default defineEventHandler(async (event) => {
    let response;
    try{
    
    const param = await readBody(event)
    const config = useRuntimeConfig(event)

    const formData = new FormData();
    
    for(var i in param) {
        formData.append(i, param[i]);
    }

    const cookie = parseCookies(event);
    response = await axios.post(`${config.baseUrl}/api/users/login`, formData,{
        headers: {
            'Cookie':`JSESSIONID=${cookie['JSESSIONID']}`
        },
        withCredentials: true
    });


    let cookies = response.headers['set-cookie'];


    if(response.status == 202)
    {
        setCookie(event, cookies);
                
        
        return response.data
    }
    else{
        return null;
    }   
    }catch(err)
    {
        return err.response.data
    }
    
 
})