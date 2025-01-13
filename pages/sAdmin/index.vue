<template>
    <div >
        <h1>Admin Register Page</h1>
        
        <div class="row g-3 align-items-center mb-4 col-4">
            
            <div class="col-2">
                <label class="form-label">Name</label>
            </div>
 
            <div class="col-4 ms-1">
                <input v-model="admin.user.name" type="text" class="form-control">
            </div>
        
        </div>

        <div class="row g-3 align-items-center mb-4 col-4">
            
            <div class="col-2">
                <label class="form-label">Surname</label>
            </div>

            <div class="col-4 ms-1">
                <input v-model="admin.user.surname" type="text" class="form-control">
            </div>
        
        </div>




        <div class="row g-3 align-items-center mb-4 col-4">
            
            <div class="col-2">
                <label class="form-label">Email</label>
            </div>

            <div class="col-4 ms-1">
                <input v-model="admin.user.email" type="email" class="form-control">
            </div>
        
        </div>


        <div class="row g-3 align-items-center mb-4 col-4">
            
            <div class="col-2">
                <label class="form-label">Phone Number</label>
            </div>

            <div class="col-4 ms-1">
                <input v-model="admin.user.phone" type="text" class="form-control">
            </div>
        
        </div>


        <div class="row g-3 align-items-center mb-4 col-4">
            
            <div class="col-2">
                <label class="form-label">Age</label>
            </div>

            <div class="col-4 ms-1">
                <input v-model="admin.user.birthDate" type="text" class="form-control">
            </div>
        
        </div>




        <div class="row g-3 align-items-center mb-4 col-4">
            
            <div class="col-2">
                <label class="form-label">City</label>
            </div>

            <div class="col-4 ms-1">
                <input v-model="admin.user.city" type="text" id="inputText" class="form-control">
            </div>
        
        </div>


        
        <div class="row g-3 align-items-center mb-4 col-4">
            
            <div class="col-2">
                <label class="form-label">Gender</label>
            </div>

            <div class="col-4 ms-1">
                <input v-model="admin.user.gender" type="text" id="inputText" class="form-control">
            </div>
        
        </div>

        <div class="row g-3 align-items-center mb-4 col-4">
            
            <div class="col-2">
                <label class="form-label">Country</label>
            </div>

            <div class="col-4 ms-1">
                <input v-model="admin.user.country" type="text" class="form-control">
            </div>
        
        </div>


        
        <div class="row g-3 align-items-center mb-4 col-4">
            
            <div class="col-2">
                <label class="form-label">Password</label>
            </div>

            <div class="col-4 ms-1">
                <input v-model="admin.user.password" type="password" class="form-control">
            </div>
        
        </div>

        <button @click="onSubmit" class="btn btn-success col-1" >Register</button>
    </div>
</template>

<script setup>
import axios from 'axios'

let admin = reactive({
    user: {
    name: "",
    surname: "",
    email :"" ,
    phone : "" ,
    birthDate :  "",
    city :"",
    gender :  "",
    country : "",
    password :""
    },
    confirmPassword :"" ,
    confirmed: false,
    conditionText : ""
})



let onSubmit = async () => {
   try{
      let user = await axios.post('/api/admin/register', admin.user)

    if(user.data.success)
   {
    return navigateTo('/login');
   }else {
    console.log('Kayıt olurken hata oluştu!')
   }
   } catch(err)
   {
    console.log(err)
    console.log('istek gönderilirken hata oluştu!')
   }
}


</script>

<style lang="scss" scoped>

</style>