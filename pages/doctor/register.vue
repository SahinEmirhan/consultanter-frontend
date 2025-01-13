<template>
    <!--
    <div v-if='problem' class='row'>
        <img class="mx-auto d-block" src="/404.png" style="width:40%">

<button @click="navigateTo('/')" class="col-3 m-auto btn btn-success mt-3 position-absolute" style="bottom: calc(5%); left: 50%; transform: translateX(-50%); color:#DAFBEB; background-color:#19E399; border:none; ;"  type="button" >Go To Home Page</button>


    </div>
    -->
    <div class="container">
        
        <div class="row d-flex align-items-center justify-content-center mt-5 text-light">
            <div class="col-2 rounded-circle justify-content-center d-flex align-items-center active-step" style=" height:2rem; width:2rem;">
                1
            </div>
              
            <div class="col-2 p-0 progress inactive-step-line" style="height:4px">
                <div class="progress-bar" :class="step > 1 ? 'active-step-line' : 'inactive-step-line'" role="progressbar" :style="`width: ${secondBar}%;`"  aria-valuemin="0" aria-valuemax="100"></div>
            </div>
    
            <div class="col-2 rounded-circle justify-content-center d-flex align-items-center" :class="step > 1 ? 'active-step' : 'inactive-step'" style=" height:2rem; width:2rem;">
                2
            </div>

            <div class="col-2 p-0 progress inactive-step-line" style="height:4px">
                <div class="progress-bar" :class="step > 2 ? 'active-step-line' : 'inactive-step-line'" role="progressbar" :style="`width: ${secondBar}%;`"  aria-valuemin="0" aria-valuemax="100"></div>
            </div>
    
            <div class="col-2 rounded-circle justify-content-center d-flex align-items-center" :class="step > 1 ? 'active-step' : 'inactive-step'" style=" height:2rem; width:2rem;">
                3
            </div>

        </div>
        <div class="row d-flex align-items-center justify-content-center">
            <div class="col-2 justify-content-center d-flex align-items-center text-center" style=" height:2rem; width:2rem; color:#34D399; font-size:14px">
               Personal Info
            </div>
    
           
            <div class="col-2 p-0" >
            </div>
    
    
            <div class="col-2 rounded-circle justify-content-center d-flex align-items-center text-center" :class="step > 2 ? 'active-step-text' : 'inactive-step-text'" style="height:2rem; width:2rem; font-size:14px ">
                Upload Files
            </div>

            <div class="col-2 p-0" >
            </div>
    
    
            <div class="col-2 rounded-circle justify-content-center d-flex align-items-center text-center" :class="step > 2 ? 'active-step-text' : 'inactive-step-text'" style="height:2rem; width:2rem; font-size:14px ">
                Login Credentials
            </div>
        </div>
    
        <div v-show="step == 1" class="row my-5 " >
                
                <div class="login-card col-md-6 col-11 m-auto position-relative">
    
                    <div class="position-absolute rounded-circle d-flex justify-content-center align-items-center text-light mt-1" style="top: calc(2%); left: 0%; transform: translateX(30%);background-color:#34D399; height:2rem; width:2rem;">
                    1
                    </div>
    
                    <div class="position-absolute" style="top: calc(2%); left: 2%; transform: translateX(30%); color:#34D399; font-size:24px;">
                            Personal Info
                    </div>
    
                   
                   
                    <div class="col-12 mt-5">
                        <div class="row mt-3">
                    
                            <div class="col-6  m-0 ">
                                <label for="inputEmail6" class="col-form-label m-0 p-0 " style="font-size:14px; color:rgba(51,51,51,0.6); ">First Name</label> 
                                <input v-model="doctor.user.name" type="text" id="inputEmail6" class="form-control" aria-describedby="emailHelpInline" placeholder="Your Name">
                            </div>
                    
                    
    
                            <div class="col-6 m-0 ">
                                <label for="inputEmail6" class="col-form-label m-0 p-0" style="font-size:14px; color:rgba(51,51,51,0.6)">Last Name</label> 
                                <input v-model="doctor.user.surname" type="text" id="inputPassword" class="form-control" aria-describedby="emailHelpInline" placeholder="Your Surname">
                            </div>
    
    
                            <div class="col-6 m-0 mt-4 ">
                                <label for="inputEmail6" class="col-form-label m-0 p-0" style="font-size:14px; color:rgba(51,51,51,0.6)">Date of birth?</label> 
                                <input v-model="doctor.user.birthDate"  type="text" id="inputPassword" class="form-control" aria-describedby="emailHelpInline" placeholder="YYYY/MM/DD">
                            </div>
    
    
                           
                            <div class="col-6 m-0 mt-4 ">
                                <label for="inputEmail6" class="col-form-label m-0 p-0" style="font-size:14px; color:rgba(51,51,51,0.6)">Phone Number</label> 
                                <input v-model="doctor.user.phone" type="tel" id="inputPassword" class="form-control" aria-describedby="emailHelpInline" placeholder="0555 555 55 55">
                            </div>
    
    
    
                            <div class="col-6 m-0 mt-4">
                                <label for="inputEmail6" class="col-form-label m-0 p-0" style="font-size:14px; color:rgba(51,51,51,0.6)">Country</label> 
                                <input v-model="doctor.user.country" type="text" id="inputPassword" class="form-control" aria-describedby="emailHelpInline" placeholder="Your Country">

    
                            </div>
    
    
                            <div class="col-6 m-0 mt-4 ">
                                <label for="inputEmail6" class="col-form-label m-0 p-0 col-12" style="font-size:14px; color:rgba(51,51,51,0.6)">Biological Sex</label> 
                                <div  class="row d-flex justify-content-center align-items-center">
                                    
                                    <div class="form-check form-check-inline col-4 mt-2">
                                        <input  v-model="doctor.user.gender" class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="male" style="width:1rem; height:1rem; ">
                                        <label  class="form-check-label" for="inlineRadio1">Male</label>
                                    </div>
                                    <div  class="form-check form-check-inline col-4 mt-2">
                                        <input v-model="doctor.user.gender" class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="female" style="width:1rem; height:1rem;">
                                        <label class="form-check-label" for="inlineRadio2">Female</label>
                                    </div>
                                </div>
                                
                                
                            </div>
    
    
                            <div class="col-6 m-0 mt-4 ">
                                <label for="inputEmail6" class="col-form-label m-0 p-0" style="font-size:14px; color:rgba(51,51,51,0.6)">City</label> 
                                <input v-model="doctor.user.city" type="text" id="inputPassword" class="form-control" aria-describedby="emailHelpInline" placeholder="Your City">

                            </div>
    
                            <button @click="onNext" class="col-2 m-auto btn btn-success mt-3 position-absolute" style="bottom: calc(5%); left: 50%; transform: translateX(-50%); color:#DAFBEB; background-color:#19E399; border:none;"  type="button" >Next</button>
                        </div>
                    </div>
                    
                    
                </div>
              
        </div>
    
        <div v-show="step == 2" class="row my-5 " >
                
                <div class="login-card col-md-6 col-11 m-auto position-relative">
    
                    <div class="position-absolute rounded-circle d-flex justify-content-center align-items-center text-light mt-1" style="top: calc(2%); left: 0%; transform: translateX(30%);background-color:#34D399; height:2rem; width:2rem;">
                    2
                    </div>
    
                    <div class="position-absolute" style="top: calc(2%); left: 2%; transform: translateX(30%); color:#34D399; font-size:24px;">
                            Upload Files
                    </div>
    
                    <div @click="onBack" class="position-absolute btn" style="top: calc(0%); right: 4%; transform: translateX(30%); color:#34D399; font-size:24px;">
                        <img src="/backicon.png" class="img-fluid" style="height:48px;width:48px;" alt="">
                    </div>
                   
                    <div class="col-12 mt-5">
                        <div class="row mt-3">

                            <div class="col-6 m-0 mt-4 ">
                                <label for="profilePhoto">Profile Photo</label>
                                <input type="file" id="profilePhoto" @change="handleFileChange('profilePhoto', $event)" />
                            </div>
                            
                             
                            <div class="col-6 m-0 mt-4 ">
                                <label for="degreePhoto">Degree Photo</label>
                                <input type="file" id="degreePhoto" @change="handleFileChange('degreePhoto', $event)" />
                            </div>
                            
                            <div class="col-6 m-0 mt-4 ">
                                <label for="taxPlate">Tax Plate</label>
                                <input type="file" id="taxPlate" @change="handleFileChange('taxPlate', $event)" />
                            </div>
                            
                            <div class="col-6 m-0 mt-4 ">
                                <label for="certificatePhoto">Certificate Photo</label>
                                <input type="file" id="certificatePhoto" @change="handleFileChange('certificatePhoto', $event)" />
                            </div>
    
                            <button @click="onNext" class="col-2 m-auto btn btn-success mt-3 position-absolute" style="bottom: calc(5%); left: 50%; transform: translateX(-50%); color:#DAFBEB; background-color:#19E399; border:none;"  type="button" >Next</button>
                        </div>
                    </div>
                    
                    
                </div>
              
        </div>
        
        <div v-show="step == 3" class="row my-5 " >
                <div class="login-card col-md-6 col-11 m-auto position-relative">
    
                    <div class="position-absolute rounded-circle d-flex justify-content-center align-items-center text-light mt-1" style="top: calc(2%); left: 0%; transform: translateX(30%);background-color:#34D399; height:2rem; width:2rem;">
                        3
                    </div>
    
                    <div class="position-absolute" style="top: calc(2%); left: 0%; transform: translateX(30%); color:#34D399; font-size:24px;">
                        Login Credentials
                    </div>
                    <div @click="onBack" class="position-absolute btn" style="top: calc(0%); right: 4%; transform: translateX(30%); color:#34D399; font-size:24px;">
                        <img src="/backicon.png" class="img-fluid" style="height:48px;width:48px;" alt="">
                    </div>
                    <div class="col-12 d-flex align-items-center">
                        <div class="row">
                    
                            <div class="col-7 m-auto mt-3 m-0 ">
                                <label for="inputEmail6" class="col-form-label m-0 p-0 " style="font-size:14px; color:rgba(51,51,51,0.6); ">Email</label> 
                                <input v-model="doctor.user.email" type="email" id="inputEmail6" class="form-control" aria-describedby="emailHelpInline" placeholder="yourmail@gmail.com">
                            </div>
    
                            <div class="col-7 m-auto mt-3 m-0 " style="position:relative">
                                <label for="inputEmail6" class="col-form-label m-0 p-0 " style="font-size:14px; color:rgba(51,51,51,0.6); ">Password</label> 
                                <input v-model="doctor.user.password" :type="isPasswordVisible ? 'text' : 'password'" id="inputEmail6" class="form-control" aria-describedby="emailHelpInline">
                                <i @click="isPasswordVisible = !isPasswordVisible " :class="isPasswordVisible ? 'bi bi-eye' : 'bi bi-eye-slash'" style="position:absolute; right:8%; top:50%;" id="togglePassword" ></i>
                            </div>
    
                            <div class="col-7 m-auto mt-3 m-0 " style="position:relative">
                                <label for="inputEmail6" class="col-form-label m-0 p-0 " style="font-size:14px; color:rgba(51,51,51,0.6); ">Confirm Password</label> 
                                <input v-model="doctor.confirmPassword"  id="inputEmail6" :type="isConfirmPasswordVisible ? 'text' : 'password'" class="form-control" aria-describedby="emailHelpInline">
                                <i @click="isConfirmPasswordVisible = !isConfirmPasswordVisible " :class="isConfirmPasswordVisible ? 'bi bi-eye' : 'bi bi-eye-slash'" style="position:absolute; right:8%; top:50%;" id="togglePassword"></i>
                            </div>
    
                        
    
                            <button @click="onSubmit" class="col-3 col-md-2 m-auto btn btn-success mt-3 position-absolute " data-bs-toggle="modal" data-bs-target="#staticBackdrop" style="bottom: calc(5%); left: 50%; transform: translateX(-50%); color:#DAFBEB; background-color:#19E399; border:none;"  type="button" >Confirm</button>
                            
                            <!--
                            <div class="d-flex justify-content-center align-items-center spinner-grow " style="position:absolute; left:50%; bottom: 8%; background-color:#DAFBEB;" v-if="isUploading">
                                <div class="row">
                                    <div class="col-12">
                                        <img src="/logo.png" style="width: 5rem; height: 5rem;" role="status" alt="">
                                        </div>
                                        <div class="col-12 text-center">
                                        <h5 style="color:#064E3B"><strong>Loading...</strong></h5>
                                    </div>
                                </div>
                            </div>
                            -->
                        </div>
                    </div>
                    
                    
                </div>
              
        </div>
                
        <AlertComponent :msg="errMessage" :status="errStatus" :headMsg ="headMsg" v-if="alertVisible" />




    </div>
    
    </template>
    
    <script setup>
    import axios from 'axios'
    
    let isUploading = ref(false);
    let step = ref(1);
    let secondBar = ref(0);
    let thirdBar = ref(0);

    let isPasswordVisible = ref(false)
    let isConfirmPasswordVisible = ref(false)
    let onBack = () => {
        if(step.value == 2)
        {
           
            for(let i = 0 ; i < 100 ; i++)
            {
                setTimeout(() => {
                    secondBar.value--;
                } , i * 2)
            }
            
        }
        else if(step.value == 3)
        {
            for(let i = 0 ; i < 100 ; i++)
            {
                setTimeout(() => {
                    thirdBar.value--;
                } , i * 2)
            } 
        }
        step.value--;
    }

    
    let onNext = () => {
         
        if(step.value == 1)
        {
           
            for(let i = 0 ; i < 100 ; i++)
            {
                setTimeout(() => {
                    secondBar.value++;
                } , i * 2)
            }
            
        }
        else if(step.value == 2)
        {
            for(let i = 0 ; i < 100 ; i++)
            {
                setTimeout(() => {
                    thirdBar.value++;
                } , i * 2)
            }
            
        }
        step.value++
    }



    /*
    let countries = ref([]);
    onMounted(() => {
        axios.get('/api/doctor/country').then((response) => {
          countries.value = response.data;
        })
    
    });
        
    let states = ref([]);
    let handleCountryChange = (event) => {
        let  selectedCountryObject   = JSON.parse(event.target.value);
    
        let selectedCountryName = selectedCountryObject.name;
      let selectedCountryId = selectedCountryObject._id;
    
        doctor.user.country = selectedCountryName;
    
        axios.get(`/api/doctor/states/${selectedCountryId}`).then((response) => {
            states.value = response.data;
        })
    
      
    };
    
    
    let handleStateChange = (event) => {
        let  selectedStateObject   = JSON.parse(event.target.value);
    
        let selectedStateName = selectedStateObject.name;
    
        doctor.user.city = selectedStateName;  
    };
    

    */
    let doctor = reactive({
    user: {
    name: "",
    surname: "",
    email :"" ,
    phone : "" ,     
    birthDate :  '',
    city :"",
    gender :  "",
    country : "",
    password :""
    },
    confirmPassword :"",
    confirmed: false,
    file: {
        degreePhoto: null,
        certificatePhoto:null,
        taxPlate:null,
        profilePhoto:null
    }
})
    

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
        const file = event.target.files[0];
        if (file) {
            doctor.file[fileName] = file;
        }
        
    }
    
    // watch([() => doctor.confirmPassword, () => doctor.user.password], (newPassword, oldPassword) => {
    //     if(doctor.confirmPassword == doctor.user.password &&  doctor.confirmPassword != "")
    //     {
    //         doctor.confirmed = true;
    //     }else {
    //         doctor.confirmed = false;
    //     }
    // }, {deep:true})
    

    const isValidPhoneNumber = (phoneNumber) => {
        var regex = /^(05\d{9}|05\d{2}[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2})$/
        return regex.test(phoneNumber);
    }


    const isValidDate = (dateString) => {
        var regex = /^\d{4}\/\d{2}\/\d{2}$/;
        if (!regex.test(dateString)) return false;
        var parts = dateString.split("/");
        var year = parseInt(parts[0], 10);
        var month = parseInt(parts[1], 10);
        var day = parseInt(parts[2], 10);
        if (year < 1800 || year > 3000 || month == 0 || month > 12) return false;
        var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) monthLength[1] = 29;
        return day > 0 && day <= monthLength[month - 1];
    }

    const isValidEmail = (email) => {
        var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }

    const checkPassword = (password) => {
      let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      return regex.test(password);
    }

    const controlFormData = (user) => {
        if(user.name.length < 2)
        {
            showAlertComponent("Name must be at least 2 characters long" , 'Error' , false)
            return false;
        }
        if(user.surname.length < 2)
        {
            showAlertComponent("Surname must be at least 2 characters long" , 'Error' , false)
            return false;
        }
        if(!isValidDate(user.birthDate))
        {
            showAlertComponent("Please enter a valid birth date." , 'Invalid Date Value' , false) 
            return false;
        }
        if(!isValidPhoneNumber(user.phone))
        {
            showAlertComponent("Please enter a valid phone Number." , 'Invalid Phone Number' , false) 
            return false;
        }
   
        if(!user.country)
        {
            showAlertComponent("Please select the country." , 'Country Should Be Selected' , false)
            return false
        }
        if(!user.gender)
        {
            showAlertComponent("Please select your biological sex." , 'Biological Sex Should Be Selected' , false)
            return false
        }
        if(!user.city)
        {
            showAlertComponent("Please select the city." , 'City Should Be Selected' , false)
            return false
        }
        if(!isValidEmail(user.email))
        {
            showAlertComponent("Please enter a valid email." , 'Invalid Email' , false)
            return false
        }
        if(!user.password)
        {
            showAlertComponent("Please enter the password." , 'Password Field Can Not Be Empty' , false)
            return false
        }
        if(!checkPassword(user.password) )
        {
            showAlertComponent("Password must be at least 8 characters. It must consist of numbers and at least one uppercase and lowercase letter." , 'Password Does Not Meet Requirements' , false)
            return false
        }
        if(user.password != doctor.confirmPassword)
        {
            showAlertComponent("Please make sure your passwords match." , 'Passwords Do Not Match Each Other' , false)
            return false
        }
    
        return true;
    }

    const onSubmit = async () => {
    try{

        if(!controlFormData(doctor.user))
        {
            return;
        }

        isUploading.value = true;

        let formData = new FormData();

        for (let i in doctor.file) {
             formData.append(i, doctor.file[i])
         }

         for (let i in doctor.user) {
             formData.append(i, doctor.user[i])
         }


         let response = await axios.post('/api/doctor/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

        if(response.data.success == true)
        {
            isUploading.value = false;
            return navigateTo(`/login`);
        }
        else {
            showAlertComponent(response.data.message , 'Error' , false);
            isUploading.value = false;

        }

        } catch(err)
        {
            console.log(err)
            console.log('istek gönderilirken hata oluştu!')
            isUploading.value = false;

        }
    }

    
    
    
    
    
    
    
watch(() => doctor.user.birthDate, (newVal) => {
  let formattedAge = '';

  if (!newVal) {
    doctor.user.birthDate = '';
    return;
  }

  newVal = newVal.substring(0, 10);

  for (let i = 0; i < newVal.length; i++) {
    if (formattedAge.length === 4 || formattedAge.length === 7) {
      if (formattedAge[formattedAge.length - 1] !== '/') {
        formattedAge += '/';
      }
    }

    if (newVal[i].match(/\d/)) {
      formattedAge += newVal[i];
    }
  }

  formattedAge = formattedAge.replace(/\/+$/, '');

  if (formattedAge !== doctor.user.birthDate) {
    doctor.user.birthDate = formattedAge;
  }
});
    
    
    
    </script>
    
    <style scoped>
    .form-check-input[type="radio"]:checked {
    background-color: #34D399; /* Change this to your desired color */
    border-color:#34D399
    }
    
    input:hover,
    input:focus {
    border-color: #34D399; /* Green border on hover and focus */
    box-shadow: 0 0 5px #34D399 /* Green shadow on hover and focus */
}
    select:hover,
    select:focus {
    border-color: #34D399; /* Green border on hover and focus */
    box-shadow: 0 0 5px #34D399 /* Green shadow on hover and focus */
    }
   
    .active-step-line{
        background-color:#34D399;
        color:#34D399;
        opacity:1;
    }
    
    .inactive-step-line{
        background-color:#A1D9C4; 
        color:#A1D9C4; 
        opacity:0.8;
    }
    
    .active-step{
        background-color:#34D399;
    }
    
    .active-step-text{
        color:#34D399;
    }
    
    .inactive-step-text{
        color:#333333; 
        opacity:0.7; 
    }
    .inactive-step{
        background-color:#A1D9C4;
    }
    
    .login-card{
        background-color:#DAFBEB;
        border:1px solid #34D399; 
        border-radius:19px;
        height:500px;
        display:flex;
    }
    @media only screen and (max-width: 450px) {
      .login-card {
        height:470px;
      }
    }
    @media only screen and (min-width: 550px) and (max-width:1050px) {
    .login-card {
    width:550px;
    }
    }
    </style>