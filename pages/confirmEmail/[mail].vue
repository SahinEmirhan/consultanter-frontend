<template>
     <div class="container footer-margin" >
<div class="row align-items-center my-5 "  >
    
    
    <div class="login-card col-md-5 col-11 m-auto d-flex flex-column justify-content-center position-relative">
        <div class="position-absolute" style="top: calc(1%); left: -2%; transform: translateX(30%); color:#34D399; font-size:24px;">
                Confirm Email
        </div>
        <div class="row "> 
            
            <div class="col-12 my-2 ">
                
                <div class="row  justify-content-center ">
                    <div class="offset-3 col-6 offset-3  m-0 ">
                        <label for="inputEmail6" class="col-form-label m-0 p-0 " style="font-size:14px; color:rgba(51,51,51,0.6); ">Verification Code</label> 
                        <input @keyup.enter="confirmMail" v-model="activationCode" type="email" id="inputEmail6" class="form-control" aria-describedby="emailHelpInline">
                        <strong  for="inputEmail6" class="col-form-label m-0 p-0 d-flex " style="font-size:12px; color:rgba(51,51,51,0.6); ">Didn't you receive the e-mail? <a href=""  @click="resendMail" class="ms-1" style="color:#34D399; text-decoration:none">resend</a > </strong> 
                    </div>
                </div>
            </div>
           
            <button @click="confirmMail" class="col-3 m-auto btn btn-success mt-3 position-absolute" style="bottom: calc(5%); left: 50%; transform: translateX(-50%); color:#DAFBEB; background-color:#19E399; border:none; ;"  type="button" >Confirm</button>
        </div>
        
    </div>
  
</div>
    <AlertComponent :msg="errMessage" :status="errStatus" :headMsg ="headMsg" v-if="alertVisible" />
                
</div>

</template>

<script setup>
import axios from 'axios'
let activationCode = ref("");
let mail = useRoute().params.mail;


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


let confirmMail = async () => {
        try{
            let response = await axios.post(`/api/confirmMail/${mail}` , {activationCode:activationCode.value })
            console.log("rs : " , response)
            if(response.status == 200 && response.data.message == "User has created")
            {
                showAlertComponent(response.data.message , 'Confirmation Success' , true)
                setTimeout(() => {
                    return navigateTo('/login')
                } , 2000)
                
            }
            else{
                showAlertComponent(response.data , 'Error' , false)
            }
        }catch(err){
            console.log("err :",err.response.data)
        }
       
           
    }

    let resendMail = () => {
        axios.get(`/api/resendMail/${mail}`).then((response) => {
            console.log("response" , response)
            if(response.status == 200)
            {
                showAlertComponent(response.data.message , 'Resend Successful' , true )
            }
            else{
                showAlertComponent(response.data.message , 'Resend Error' , false )
            }
        })
    }
</script>

<style scoped>
input{
    height:42px;
}
.login-card{
    background-color:#DAFBEB;
    border:1px solid #34D399; 
    border-radius:19px;
    height:380px;
    display:flex;
}
@media only screen and (max-width: 765px) {
  .login-card {
    height:350px;
    width:98%;
  }
}

@media only screen and (min-width: 765px) and (max-width:1080px) {
  .login-card {
    height:330px;
    width:60%;
  }
}

@media only screen and (min-width: 450px) and (max-width:1080px) {
  .footer-margin{
    margin-bottom:70%
  }
}

</style>