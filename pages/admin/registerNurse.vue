<template>
    <div class="container">
        <div class="row">
            <div class="card mt-5" style="background-color: #DAFBEB;">
                <div class="row p-3" >
                    <h4>Register Nurse</h4>
                    <div class="row">
                        <div class="form-group col-6 col-lg-6 my-3">
                        <label for="exampleFormControlInput1">Name</label>
                        <input v-model="nurseInfo.name" type="text" class="form-control" id="exampleFormControlInput1">
                        </div>
                        <div class="form-group col-6 col-lg-6 my-3">
                        <label for="exampleFormControlInput1">Surname</label>
                        <input v-model="nurseInfo.surname" type="text" class="form-control" id="exampleFormControlInput1">
                        </div>
                        <div class="form-group col-6 col-lg-6 my-3">
                        <label for="exampleFormControlInput1">Email</label>
                        <input v-model="nurseInfo.email" type="email" class="form-control" id="exampleFormControlInput1">
                        </div>
                        
                        <div class="form-group col-6 col-lg-6 my-3">
                        <label for="exampleFormControlInput1">Phone Number</label>
                        <input v-model="nurseInfo.phone" type="text" class="form-control" id="exampleFormControlInput1">
                        </div>
                        <div class="form-group col-6 col-lg-6 my-3">
                        <label for="exampleFormControlInput1">Birth Date</label>
                        <input v-model="nurseInfo.birthDate" type="text" class="form-control" id="exampleFormControlInput1">
                        </div>
                        <div class="form-group col-6 col-lg-6 my-3">
                                <label for="inputEmail6" class="col-form-label m-0 p-0 col-12" >Biological Sex</label> 
                                <div  class="row d-flex justify-content-center align-items-center">
                                    
                                    <div class="form-check form-check-inline col-4 mt-2">
                                        <input  v-model="nurseInfo.gender" class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="male" style="width:1rem; height:1rem; ">
                                        <label  class="form-check-label" for="inlineRadio1">Male</label>
                                    </div>
                                    <div  class="form-check form-check-inline col-4 mt-2">
                                        <input v-model="nurseInfo.gender" class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="female" style="width:1rem; height:1rem;">
                                        <label class="form-check-label" for="inlineRadio2">Female</label>
                                    </div>
                            </div>
                        </div>
                        <div class="form-group col-6 col-lg-6 my-3">
                        <label for="exampleFormControlInput1">Country</label>
                        <input v-model="nurseInfo.country" type="text" class="form-control" id="exampleFormControlInput1">
                        </div>
                        <div class="form-group col-6 col-lg-6 my-3">
                        <label for="exampleFormControlInput1">City</label>
                        <input v-model="nurseInfo.city" type="text" class="form-control" id="exampleFormControlInput1">
                        </div>
                        <div class="form-group col-6 col-lg-6 my-3">
                        <label for="exampleFormControlInput1">Password</label>
                        <input v-model="nurseInfo.password" type="password" class="form-control" id="exampleFormControlInput1">
                        </div>
                        <div class="form-group col-6 col-lg-6 my-3">
                        <label for="exampleFormControlInput1">Confirm Password</label>
                        <input v-model="confirmPassword" type="password" class="form-control" id="exampleFormControlInput1">
                        </div>
                        <div class="col-12 d-flex justify-content-end  mt-5">
                            <button class="btn  btn-success" @click="register" > Register Nurse </button>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
        <AlertComponent :msg="errMessage" :status="errStatus" :headMsg ="headMsg" v-if="alertVisible" />
    </div>
</template>

<script setup>
let nurseInfo = reactive({
    name : "",
    surname : "",
    email : "",
    phone : "",
    birthDate : "",
    gender : "",
    country : "",
    city : "",
    password : ""
});

let confirmPassword = ref("");

const register = () => {
    controlFormData(nurseInfo);
    //register işlemleri
}



watch(() => nurseInfo.birthDate, (newVal) => {
  let formattedAge = '';

  if (!newVal) {
    nurseInfo.birthDate = '';
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

  if (formattedAge !== nurseInfo.birthDate) {
    nurseInfo.birthDate = formattedAge;
  }
});

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
            showAlertComponent("Please enter the country." , 'Country Should Be Selected' , false)
            return false
        }
        if(!user.gender)
        {
            showAlertComponent("Please select your biological sex." , 'Biological Sex Should Be Selected' , false)
            return false
        }
        if(!user.city)
        {
            showAlertComponent("Please enter the City." , 'City Should Be Selected' , false)
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
        if(user.password != confirmPassword.value)
        {
            showAlertComponent("Please make sure your passwords match." , 'Passwords Do Not Match Each Other' , false)
            return false
        }
    
        return true;
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
</style>