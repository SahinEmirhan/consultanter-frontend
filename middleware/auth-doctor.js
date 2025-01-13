export default defineNuxtRouteMiddleware(async (to , from)=>{
        try{

                const doctor =  await useFetch('/api/middleware/isDoctor');
                if(doctor.data.value.success)
                {
                        return
                }else {
                        return navigateTo("/error")
                }

        } catch(err)
        {
                console.log(err)
                return navigateTo("/login")

        }
})