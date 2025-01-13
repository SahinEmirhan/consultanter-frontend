<template>
  <div class="container" style="min-height:35rem">

     <div class="d-flex justify-content-center align-items-center spinner-grow " style="position:absolute; left:50%; top: 35%; background-color:#ECFDF5;" v-if="pending">
       <div class="row">
         <div class="col-12">
           <img src="/logo.png" style="width: 20rem; height: 20rem;" role="status" alt="">
           </div>
           <div class="col-12 text-center">
           <h1 style="color:#064E3B"><strong>Loading...</strong></h1>
         </div>
       </div>
     </div>


 <div v-else class="row mt-5">

  <div class="d-block d-md-none ">



       <div class="col-10 col-sm-6 mx-auto d-flex justify-content-start mb-1 ">

         <NuxtImg class="border border-1 border-success"   :src="'data:image/jpeg;base64,' + doctor.profilePhoto" style="width: 190px; height: 170px; border-radius:8px;" alt="Profile Photo" />

       </div>

     </div>


   <div class="col-10 col-sm-6 mx-auto ">
     <div class="row ">
       <div class="col-12 col-md-6 col-lg-6 col-xl-6 mb-1" style="font-size:22px; font-weight:medium; color:#004B37">
        {{doctor.name}} {{ doctor.surname }}
         <div class="col-6 mt-2">
        <div style="font-size:14px; font-weight:medium; color:rgba(98, 153, 136,0.8)">
          FILES :
         <span style="color:rgba(0, 75, 55,0.8)">
          {{newFiles.length }}
          </span>
        </div>
      </div>
    </div>


    <div class="d-none d-md-block col-12 col-md-6 d-flex justify-content-end">


     <div  class="d-flex justify-content-end ">


       <NuxtImg class="border border-1 border-success" :src="'data:image/jpeg;base64,' + doctor.profilePhoto"style="width: 190px; height: 170px; border-radius:8px;" alt="Profile Photo" />

     </div>
   </div>


       <!-- <button @click="complaint = {} " type="button" data-bs-toggle="modal" :data-bs-target="'#modal_complaint'" class="btn btn-sm col-9 col-md-3 col-lg-3 col-xl-3 text-light d-none d-lg-block" style="font-size:14px; background-color:#34d399; border:none;">Create Complaint</button>-->

       <!-- <button @click="approve " type="button" class="btn btn-sm col-9 col-md-3 col-lg-3 col-xl-3 text-light d-none d-lg-block" style="font-size:14px; background-color:#34d399; border:none;">approve</button> -->
     </div>
   </div>


   <!--
   <div class="offset-3 col-6 mb-2 mt-4 d-block d-lg-none">
   <button @click="complaint = {} " type="button" data-bs-toggle="modal" :data-bs-target="'#modal_complaint'" class="btn btn-sm col-9 col-md-3 col-lg-3 col-xl-3 text-light " style="font-size:14px; background-color:#34d399; border:none;">Create Complaint</button>
   </div>
   -->
   <ul class="nav nav-tabs  col-10 col-xs-6 col-md-6 offset-3 mt-4 d-none d-sm-flex">

       <li class="nav-item ">
       <a @click="tab = 'about'" class="nav-link " :class="[(tab == 'about') ? 'active-tab' : 'inactive-tab']" aria-current="page" href="#">About</a>
       </li>

       <li class="nav-item">
         <a @click="tab = 'complaints'" class="nav-link " :class="[(tab == 'complaints') ? 'active-tab' : 'inactive-tab']"  href="#">Complaints</a>
       </li>

       <li class="nav-item">
         <a @click="tab = 'files'"  class="nav-link" :class="[(tab == 'files') ? 'active-tab' : 'inactive-tab']"  href="#">Files</a>
       </li>



   </ul>

   <ul class="nav nav-tabs  col-10 mx-auto  mt-4 d-flex d-sm-none">

<li class="nav-item ">
<a @click="tab = 'about'" class="nav-link " :class="[(tab == 'about') ? 'active-tab' : 'inactive-tab']" aria-current="page" href="#">About</a>
</li>

<li class="nav-item">
  <a @click="tab = 'complaints'" class="nav-link " :class="[(tab == 'complaints') ? 'active-tab' : 'inactive-tab']"  href="#">Complaints</a>
</li>

<li class="nav-item">
  <a @click="tab = 'files'"  class="nav-link" :class="[(tab == 'files') ? 'active-tab' : 'inactive-tab']"  href="#">Files</a>
</li>



</ul>





   <div v-if="tab == 'about' " class=" col-10 col-sm-6 mx-auto mt-2 ">
     <div class="row">


       <div class="col-lg-6 col-12 mt-3">
         <div class="row">
           <div class="col-lg-5 col-4 col-sm-5 pe-0 about-text-font" style="color:#004B37;">
             Name :
           </div>
           <div class="col-lg-6 col-8 col-sm-7 ps-0 about-text-font" style="color:#2C6E5B;">
             {{ doctor.name }} {{ doctor.surname }}
           </div>
         </div>
       </div>


       <div class="col-lg-6 col-12 mt-3">
         <div class="row">
           <div class="col-lg-5 col-4 col-sm-5 pe-0 about-text-font" style="color:#004B37;">
             Country :
           </div>
           <div class="col-lg-6 col-8 col-sm-7 ps-0 about-text-font" style="color:#2C6E5B;">
             {{ doctor.country }}
           </div>
         </div>
       </div>






       <div class="col-lg-6 col-12 mt-3">
         <div class="row">
           <div class="col-lg-5 col-4 col-sm-5 pe-0 about-text-font" style="color:#004B37;">
             City :
           </div>
           <div class="col-lg-6 col-8 col-sm-7 ps-0 about-text-font" style="color:#2C6E5B;">
            {{ doctor.city }}
           </div>
         </div>
       </div>


       <div class="col-lg-6 col-12 mt-3">
         <div class="row">
           <div class="col-lg-5 col-4 col-sm-5 pe-0 about-text-font" style="color:#004B37;">
             E-Mail :
           </div>
           <div class="col-lg-6 col-8 col-sm-7 ps-0 about-text-font" style="color:#2C6E5B;">
             {{ doctor.email }}
           </div>
         </div>
       </div>


       <div class="col-lg-6 col-12 mt-3">
         <div class="row">
           <div class="col-lg-5 col-4 col-sm-5 pe-0 about-text-font" style="color:#004B37;">
             Age :
           </div>
           <div class="col-lg-6 col-8 col-sm-7 ps-0 about-text-font" style="color:#2C6E5B;">
             {{ doctor.birthDate }}
           </div>
         </div>
       </div>




     </div>
   </div>


   <div v-if="tab == 'complaints' " class="col-12 col-sm-12 col-xl-9 mx-auto mt-4 ">
      <div class="row">
        <div class="col-10 mt-0 mb-3 d-block">
        <button @click="complaint = {} " type="button" data-bs-toggle="modal" :data-bs-target="'#modal_complaint'" class="btn btn-sm text-light d-none d-lg-block bg-warning float-end col-2" style="font-size:14px;  border:none;">Create Complaint</button>
      </div>

      <div  class="d-flex justify-content-center row">
        <template v-for="c in tempComplaints" :key="c.id">
          <Report  :chatMessage="c.text" :id="c.id" :userType="'null'" :routeName="'complaint'" class="col-12 mx-2 col-sm-4 my-3" />

        </template>

      </div>
    </div>



   </div>

   <div v-if="tab == 'files' " class="col-12 col-sm-12 col-xl-9 mx-auto mt-4 ">
     <div class="row d-flex justify-content-center" >
       <template v-for="file in newFiles"  :key="file.id">
         <Report v-if="newFiles.length > 0" :date="file.date"   :chatMessage="file.complaint" :id="file.id" :userType="'doctor'" :routeName="'file'" class="col-12 mx-2 col-sm-4 my-3" />
       </template>

     </div>




   </div>
   <div class="modal fade " :id="'modal_complaint'" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true" >
              <div class="modal-dialog modal-dialog-centered" >
                <div class="modal-content" style="background-color: #ECFDF5;">
                  <div class="modal-header"  >
                    <h1 class="modal-title fs-5" id="modalLabel">Create Complaint</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <form v-if="doctor">
                      <div class="mb-3">
                          <label for="message-text" class="col-form-label">Message : </label>
                          <textarea v-model="complaint.message" class="form-control" id="message-text"></textarea>
                      </div>

                    </form>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="createComplaint">Create</button>
                  </div>
               </div>
            </div>
    </div>




 </div>
    <ClientOnly>
    <AlertComponent :msg="errMessage" :status="errStatus" :headMsg ="headMsg"  v-if="alertVisible"/>
    </ClientOnly>
  </div>


</template>

<script setup>
import axios from 'axios';
let complaint = ref({


})
let tab = ref("about");




let { pending, data: doctor, status  } = await useLazyFetch('/api/doctor/profile')
let { pending2, data: newFiles, status2  } = await useLazyFetch('/api/doctor/currentFiles')
let { pending3, data: tempComplaints, status3  } = await useLazyFetch('/api/complaint/myComplaints')

const userTypeCookie = useCookie('doctorType');

// Cookie'yi set et
userTypeCookie.value = doctor.value.doctorType;

console.log(doctor)


const specializationCookie = useCookie("specialization");
specializationCookie.value = doctor.value.specialization;

function getBase64Image(document) {




  let blob = new Blob([document], { type: 'image/jpeg' });


  let imageUrl = URL.createObjectURL(blob);


  console.log(imageUrl)



  return imageUrl;

}

const createComplaint = async() => {
        try{

          const response = await axios.post('/api/complaint/create', complaint.value , {withCredentials:true})

          console.log('response :>> ', response);
          if(response.data.success){
            console.log(response.data)
              let newComplaint = {
                id : response.data.id,
                text : response.data.message,
                closed : false
              }
              tempComplaints.value.push(newComplaint)
              console.log(tempComplaints.value)
          }

        }
        catch(err){
            console.log('err :>> ', err);
            console.log('istek gönderilirken hata oluştu!')
        }
    }


let alertVisible = ref(false)
    let errMessage = ref('')
    let errStatus = ref('')
    let headMsg = ref('')
    let showAlertComponent = async (msg , head ,status) => {
        alertVisible.value = true
        errMessage.value = msg
        errStatus.value = status
        headMsg.value = head
        setTimeout(async ()=> {
          alertVisible.value = false
        } , 15000)

    }


definePageMeta
({
  middleware
: [
    'auth-doctor',
  ],
});

</script>

<style scoped>

.spinner-grow {
    animation-duration: 1.7s;
}

.about-text-font{
  font-size:16px;
  font-weight:500;
}

.active-tab{
  background-color:#34d399;
  color:white;
}

.inactive-tab{
  color:#004B37;
}

input:-webkit-autofill {
        background-color: #cbffef !important; /* Önerilen değerler seçildiğinde arka plan rengini değiştirir */
        -webkit-box-shadow: 0 0 0 30px #cbffef inset !important; /* Gölgeli iç kısım rengini değiştirir */
    }

</style>
