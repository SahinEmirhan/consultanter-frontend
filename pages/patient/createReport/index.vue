<template>
  <div class="container">
     
     <!-- Loading Spinner Container -->
     <div v-if="isLoading" class="loading-overlay">
      <div class="spinner-border text-light" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div class="col-8 m-auto d-flex justify-content-center row">

        <div class="mb-4 col-12 mt-4">
          <label style="font-size:22px;font-weight:400; color:#059669;" for="exampleFormControlTextarea1" class="form-label mb-1">Complaint</label>
          <textarea placeholder="Write your complaint..." v-model="patient.complaint" style="border:1px solid lightgray; height: 150px; font-size:20px;" class="form-control" id="exampleFormControlTextarea1" rows="3" ></textarea>
        </div>  

        
        <div>
          

          <div class="col-12">
            <div class="row">
                <div class="mb-5 col-6" >
                  <label style="font-size:22px;font-weight:400; color:#059669;" class="mb-1">Height (cm)</label>
                  <input v-model="patient.height" type="number" class="form-control">
                </div>
          
              <div class="mb-5 col-6">
                <label style="font-size:22px;font-weight:400; color:#059669;" class="mb-1" >Weight (kg)</label>
                <input v-model="patient.weight" type="number" class="form-control">
              </div>

              <div class="mb-5 col-6">
              <label style="font-size:22px;font-weight:400; color:#059669;" for="formFileMultiple" class="form-label">Documents (png , jpg , jpeg , pdf etc.) </label>
              <input @change="handleFileChange('documents')" class="form-control" type="file" id="Document" ref="fileInput" multiple>
              </div>

              <div class="mb-5 col-6">
              <label style="font-size:22px;font-weight:400; color:#059669;" for="formFileMultiple" class="form-label">X-ray tomography and similar files </label>
              <input @change="handleFileChange('dicom')" class="form-control" type="file" id="Dicom" ref="fileInput" multiple>
              </div>
              <div class="col-12 row">
                    <label style="font-size:22px;font-weight:400; color:#059669;" class="mb-1" >Known Conditions</label>
                    <input v-model="patient.knownConditions" type="text" class="form-control">
              </div>
             

            </div>
          </div>
        </div>
      <div>
    </div>


          

          
          
          
          <div class="row d-flex justify-content-center mt-5">
            <div v-if="uploading">
              <div class="progress col-6 mx-auto">
                <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" :style="{ width: progress + '%' }" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100">{{ progress }}%</div>
              </div>
            </div>
            <button v-else @click="onSubmit" style="background-color: #059669;"  class="btn col-4 mx-3 text-light">Create</button>
          </div>
          
          <!-- Success Message -->
    <div v-if="isSuccess" class="success-overlay">
      <div class="alert alert-success alert-dismissible fade show text-center" role="alert">
        🎉 İşlem başarıyla tamamlandı!
        <button 
          type="button" 
          class="btn-close" 
          aria-label="Close" 
          @click="isSuccess = false"
        ></button>
      </div>
    </div>

    <div v-if="isNotSuccess" class="success-overlay">
      <div class="alert alert-danger alert-dismissible fade show text-center" role="alert">
        Ticket Sayısı Yetersiz veya Beklenmeyen bir Hata Oluştu!
        <button 
          type="button" 
          class="btn-close" 
          aria-label="Close" 
          @click="isNotSuccess = false"
        ></button>
      </div>
    </div>


      </div>
<template v-if="isConfirmVisible"> 
<div class="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50">
  <div class="card p-4" style="width: 20rem;">
    <div class="card-body">
      <h5 class="card-title">Confirm Delete</h5>
      <p class="card-text">Are you sure you want to delete the file?</p>
      <div class="d-flex justify-content-end">
        <button @click="cancel" class="btn btn-secondary me-2">No, Update</button>
        <button @click="deleteAll" class="btn btn-danger">Delete</button>
      </div>
    </div>
  </div>
</div>
</template>

<AlertComponent :msg="errMessage" :status="errStatus" :headMsg ="headMsg" v-if="alertVisible" />
  </div>
</template>

<script setup>
import axios from "axios"

let isLoading = ref(false);
let isSuccess = ref(false);
let isNotSuccess = ref(false);

const isConfirmVisible = ref(false)

const showConfirmCard = () => {
isConfirmVisible.value = true
}
const cancel = () => {
isConfirmVisible.value = false
}

let modal = ref(false)
let doctors = ref([]);
let selectedDoctor = ref({});

let patient = ref({ 
  complaint : "" ,
  height : 0 ,
  weight : 0,
  knownConditions: ""
 });

let files = ref({
  documents: [], 
  dicom: []
})




let fileId = useRoute().params.id

import Cookies from 'js-cookie';


function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


let onSubmit = async () => {


 
  try{
    isLoading.value = true;
    isSuccess.value = false;
    isNotSuccess.value = false;
    let user = await axios.post(`/api/patient/updateFile`, patient.value)

    console.dir(user)

    for(var i in files.value.documents) {
      let formData = new FormData();
      formData.append("document", files.value.documents[i])
      formData.append("type", "document")
      formData.append("fileId", user.data.id)

      await axios.post(`/api/patient/uploadFile`, formData, {withCredentials: true});

      await delay(500);
    
    }

    for(var i in files.value.dicom) {
      let formData = new FormData();
      formData.append("document", files.value.dicom[i])
      formData.append("type", "dicom")
      formData.append("fileId", user.data.id)
      await axios.post(`/api/patient/uploadFile`, formData, {withCredentials: true});
      await delay(500);
    }



    console.log(user.data)


  if(user.data)
 {
  console.log('BAŞARILI')
  console.log('formData : ' + user.data)
  isLoading.value = false;
  isSuccess.value = true;
  setTimeout( async ()=> {
    isSuccess.value = false;
    return navigateTo('/patient')
  } , 3000)
 }else {
  console.log('Ticket Sayısı Yetersiz veya Beklenmeyen bir Hata Oluştu')
  isLoading.value = false;
  isNotSuccess.value = true;
  setTimeout( async ()=> {
    isNotSuccess.value = false;
  } , 3000)
 }
 } catch(err)
 {
  console.log(err)
  console.log('istek gönderilirken hata oluştu!')
  isLoading.value = false;
  isNotSuccess.value = true;
  setTimeout( async ()=> {
    isNotSuccess.value = false;
  } , 3000)
  
 }


}




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






let handleFileChange = async(fileName) => {
  files.value[fileName] = [...event.target.files]
  }
  
</script>

<style scoped>
.clickable-span {
cursor: pointer; /* Mouse üzerine geldiğinde imlecin el simgesi olmasını sağlar */
}

.clickable-span:hover {
color: red; /* Mouse üzerine geldiğinde rengin kırmızı olmasını sağlar */
}

.loading-overlay, .success-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Yarı opak siyah */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
}

/* Alert Boyutu */
.alert {
  max-width: 400px;
  width: 100%;
  padding: 1.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

/* Spinner boyutu (isteğe bağlı) */
.spinner-border {
  width: 3rem;
  height: 3rem;
}


</style>