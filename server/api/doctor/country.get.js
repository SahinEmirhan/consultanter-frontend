import axios from 'axios'
export default defineEventHandler(async(event) => {
    const config = useRuntimeConfig(event)
    const response = await axios.get(`${config.baseUrl}/location/countries`)

    if(response.status == 200)
    {
        return response.data
    }
})