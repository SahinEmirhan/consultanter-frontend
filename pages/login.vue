<template>
    
    <div class="container">

        


        <div class="row align-items-center my-5 " >
            
            
            <div class="login-card col-md-5 col-11 m-auto d-flex flex-column justify-content-center position-relative">
                <div class="position-absolute" style="top: calc(2%); left: 2%; transform: translateX(30%); color:#34D399; font-size:24px;">
                        Login
                </div>
                <div class="row ">
                    
                    <div class="col-12 my-2 ">
                        
                        <div class="row  justify-content-center ">
                            <div class="offset-3 col-6 offset-3  m-0 ">
                                <label for="inputEmail6" class="col-form-label m-0 p-0 " style="font-size:14px; color:rgba(51,51,51,0.6); ">Email</label>
                                <input @keyup.enter="onSubmit" v-model="patientLoginValues.email" type="email" id="inputEmail6" class="form-control" aria-describedby="emailHelpInline">
                            </div>
                        </div>
                    </div>
                    <div class="col-12 my-2">
                        <div class="row justify-content-center">
                            <div class="offset-3 col-6 offset-3 justify-content-center m-0 ">
                                <div class="row">

                                
                                
                                <div class="col-12" style="position:relative">
                                    <label for="inputPassword" class="col-form-label m-0 p-0 col-12" style="font-size:14px; color:rgba(51,51,51,0.6)">Password</label> 
                                    <input @keyup.enter="onSubmit" v-model="patientLoginValues.password" class="form-control" :type="isPasswordVisible ? 'text' : 'password'" id="inputPassword"  aria-describedby="emailHelpInline">
                                    <i @click="isPasswordVisible = !isPasswordVisible" :class="isPasswordVisible ? 'bi bi-eye' : 'bi bi-eye-slash'" style="position:absolute; right:10%; top:50%;" id="togglePassword"></i>
                                </div>
                                </div>
                                
                             </div>
                        </div>
                    </div>

                    <button @click="onSubmit" class="col-3 m-auto btn btn-success mt-3 position-absolute" style="bottom: calc(5%); left: 50%; transform: translateX(-50%); color:#DAFBEB; background-color:#19E399; border:none; ;"  type="button" >Login</button>
                </div>
                
            </div>
          
        </div>
            <AlertComponent :msg="errMessage" :status="errStatus" :headMsg ="headMsg" v-if="alertVisible" />
                        
    </div>
    

        

</template>

<script setup>
import axios from 'axios'
    
//let store = usePatientStore();
let patientLoginValues = ref({
    email : '',
    password : '',
})
//withCredentials : true
//../../store/state~/store/store.js
//post login values , replace the token , get user and route patient home page

let alertVisible = ref(false)
let errMessage = ref('')
let errStatus = ref('')
let headMsg = ref('')
let showAlertComponent = (msg , head ,status) => {
    alertVisible.value = true
    errMessage.value = msg
    errStatus.value = status 
    headMsg.value = head
    setTimeout( async ()=> {
        alertVisible.value = false
    } , 4000)
}

let isPasswordVisible = ref(false)


let onSubmit = async () => {

    if(patientLoginValues.value.email == '' || patientLoginValues.value.password == '')
    {
        showAlertComponent('Please enter your email address and password ' , 'Error' , false )
        return 1;
        
    }
    
    let response  = await axios.post('/api/login', patientLoginValues.value, {withCredentials:true})

    if(response.data?.success)
    {
        showAlertComponent('Succesfully Logged in.' , 'Logined' , 'success' )

        let userType = await axios.get('/api/userType', { withCredentials: true});
        
        if(userType.data.userType == "PATIENT") 
        {
            return navigateTo('/patient' , {external : true});

        }else if(userType.data.userType == "DOCTOR")
        {   
            return navigateTo('/doctor' , {external : true});

        } else if (userType.data.userType == "ADMIN")
        {
             return navigateTo('/admin' , {external : true});
        }
            

    }
    else
    {
        showAlertComponent(response.data.message , 'Error' , response.data.success )
    }
}



</script>

<style  scoped>
input{
    height:42px;
}
.login-card{
    background-color:#DAFBEB;
    border:1px solid #34D399; 
    border-radius:19px;
    height:425px;
    display:flex;
}
@media only screen and (max-width: 450px) {
  .login-card {
    height:300px;
  }
}

@media only screen and (min-width: 550px) and (max-width:1050px) {
  .login-card {
    width:450px;
  }
}
</style>