import axios from 'axios'
export default defineEventHandler(async (event)=>{
try {
   
    axios.defaults.withCredentials = true;
    const config = useRuntimeConfig(event);
    const cookies = parseCookies(event);


  
    const response = await axios.get(`${config.baseUrl}/api/users/userType`,
        {
            headers: {
                'Cookie':`JSESSIONID=${cookies['JSESSIONID']}`
            },
            withCredentials: true
        
        }
    );

    if(response.data.success)
    {
        setCookie(event, 'userType', response.data.userType,
            {
                sameSite: 'none',
                secure:true
            })
        return response.data;
    }
    else{
        return null
    }

 
} catch(error) {
    console.log(error.response.data)
}

})