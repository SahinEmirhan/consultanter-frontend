<template >

            
    <div class="card text-center" style="width: 275px; height: 145px; display:flex;">
        <div v-if="step>1" @click="step--" class="position-absolute btn" style="border:none; top: calc(-6%); right: 4%; transform: translateX(30%); color:#34D399; font-size:24px;">
                    <img src="/backicon.png" class="img-fluid" style="height:32px;width:32px;" alt="">
                </div>
                
        <span class="date-text"  ></span>
        <span data-bs-toggle="modal" :data-bs-target="`#exampleModal${props.id}`" class="m-auto card-text text-center mx-2 text-truncate btn" style="padding-bottom:15px; ">{{chatMessage}}</span>

        <div v-if="step == 1">
 
        <button  @click="step++;" class="btn-sm card-button p-0 position-absolute"
                style="top: calc(90%); left: 30%; transform: translateX(-50%); color:#ECFDF5; border-top-right-radius:0px; width:75px; height:25px; background-color:#D33434">
                Reject
        </button>
        <button @click="onApprove()" class="btn-sm card-button p-0 position-absolute" 
                style="top: calc(90%); left: 70%; transform: translateX(-50%); color:#ECFDF5; border-top-left-radius:0px; width:75px; height:25px;">   
                Approve
        </button>
        </div>

        <div v-if="step == 2">

        
        <button class="btn-sm card-button p-0 position-absolute"
                style="top: calc(90%); left: 30%; transform: translateX(-50%); color:#ECFDF5; border-top-right-radius:0px; width:75px; height:25px; background-color:#D33434">
                Close
        </button>
        <button  @click="step++;"  class="btn-sm card-button p-0 position-absolute" 
                style="top: calc(90%); left: 70%; transform: translateX(-50%); color:#ECFDF5; border-top-left-radius:0px; width:75px; height:25px;">   
                Dispatch
        </button>
        </div>
        
        <div v-if="step==3">
        <div style="top: calc(73%); left: 35%; transform: translateX(-50%);" class=" position-absolute">
            <select style="height:32px; width:170px; font-size:14px;"  class="form-select" aria-label="Default select example">
                <option selected>Select Department</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>
            
        </div>
        <button class="ms-2 btn-sm card-button p-0 position-absolute" 
                style="top: calc(76%); left: 80%; transform: translateX(-50%); color:#ECFDF5; width:75px; height:24px;">   
                Confirm
        </button>
        </div>


<div class="modal fade" :id="`exampleModal${props.id}`" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header"  style="background-color:#ECFDF5">
        <h3 class="modal-title fs-5" id="exampleModalLabel">Complaint</h3>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body text-start" style="background-color:#ECFDF5">
        {{ chatMessage }}
      </div>
    </div>
  </div>
</div>

<AlertComponent :msg="errMessage" :status="errStatus" :headMsg ="headMsg" v-if="alertVisible" />

    </div>

</template>

<script setup>
import axios from 'axios'
const step = ref(1);
const props = defineProps(['chatMessage' , 'date' ,'id' , 'routeName'])
const itemStatus = ref('')


const onApprove = async() => {
    itemStatus.value = 'Approved' ;
    await axios.get(`/api/doctor/approve/${props.id}`).then((response) => {
        console.log('response :>> ', response);
        if(response.status == 200)
        {
            showAlertComponent(response.data.message , 'Approved' , true)
            setTimeout(() => {
                window.location.reload()
            } , 500)
        }
        else{
            showAlertComponent('Error' , 'Error' , false)
        }
    })
}

let alertVisible = ref(false)
    let errMessage = ref('')
    let errStatus = ref('')
    let headMsg = ref('')
    const showAlertComponent = (msg , head ,status) => {
        alertVisible.value = true
        errMessage.value = msg
        errStatus.value = status 
        headMsg.value = head
        setTimeout( async ()=> {
            alertVisible.value = false
        } , 4000)
    }

</script>

<style scoped>
.card {
    height: 145px;
    max-height: 100%;
    border-radius: 24px;
    border-color: #c3b2a0;
    background-color: #FFF0DE;
}

.card-text {
    font-size: 12px;
    font-weight: bold;
    color: #004B37;
}

.card-button{
    background-color:#34D399;
    border-radius: 12px;
    border:0px;
    width: 105px;
    height: 27px;
    font-size: 12px;
    font-weight: bold;
    line-height: 140%;
}
.card-button:hover{
    background-color:rgb(19, 205, 143);
}
.date-text{
    color:#629988;
    font-size:10px;
    font-weight:normal;
}
</style>
