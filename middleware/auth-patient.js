export default defineNuxtRouteMiddleware(async (to , from)=>{
        try{

                const patient =  await useFetch('/api/middleware/isPatient');

                if(patient.data.value.success)
                {
                        return
                }else {
                        return navigateTo("/login")
                }

        } catch(err)
        {
                console.log(err)
                return navigateTo("/login")

        }
})