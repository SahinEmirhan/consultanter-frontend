import axios from 'axios'
export default defineEventHandler(async(event) => {
    const config = useRuntimeConfig(event)

    const id = getRouterParam(event, 'id')
   
    const response = await axios.get(`${config.baseUrl}/location/states/${id}`)

    if(response.status == 200)
    {
        return response.data
    }
})