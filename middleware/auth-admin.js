export default defineNuxtRouteMiddleware(async (to , from)=>{
        try{

                const admin =  await useFetch('/api/middleware/isAdmin');

                if(admin.data.value.success)
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