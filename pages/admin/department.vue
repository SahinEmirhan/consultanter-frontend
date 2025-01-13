<template>

    <div v-if="pending">
            <p >Loading...</p>
          </div>
    <div v-else id="app" class="container mt-5">
    
    
   
      
        <div class="row">
        <div class="card" style="background-color: #DAFBEB;">

        
        <div class="row p-3" >
            <div  class="col-12" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                <div class="row">
                    <h4 class="col-11 m-0">Departments</h4>
                    <i class="bi bi-chevron-down col-1 text-end" style="font-size:20px;"></i>
                </div>
            </div>
          
            <div  id="collapseExample" class="collapse col-12 col-md-4 col-lg-3 col-xl-2 my-1"   v-for="item in department">
                <div class="text-center p-2"style="background-color:#ECFDF5;">
                    {{ item.name }}
                </div>
                
            </div>
        </div>  
        </div>


      <div>

        <div class="card mt-5" style="background-color: #DAFBEB;">
            <div class="row p-3" >
                <h4>Add department</h4>
                <div class="row">
                    <div class="form-group col-6 col-lg-4 my-3 me-lg-4">
                    <label for="exampleFormControlInput1">Department Name</label>
                    <input v-model="name" type="text" class="form-control" id="exampleFormControlInput1">
                    </div>
                    <div class="col-12 col-lg-4 row p-0 ">
                        <div class="col-6 col-lg-6 px-4 my-3"    v-for="(item,index) in finds" :key="index">
                            <div class="row " style="background-color: #ECFDF5;" >
                                <div class="col-10 p-0 ps-2"  >
                                    {{ item }}
                                </div>
                                <div class="col-2 p-0 d-flex align-items-center" >
                                    <button @click="finds.splice(index, 1)" class="btn btn-sm text-danger border-0" >X</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 d-flex justify-content-end  mt-5">
                        <button class="btn  btn-success" @click="addDepartment" > Add Department </button>
                    </div>
                </div>
            </div>
        </div>

       


          
          

        </div>
        </div>
    </div>

    </template>

      <script setup>
      import axios from 'axios'


    let { pending, data: department, status  } = await useLazyFetch('/api/admin/department')
    let subDepartmentInput = '';
    let finds = ref([]);
    let name = ref('');

    let addFind = async() => {
        try {
            if(subDepartmentInput != '')
            {
                finds.value.push(subDepartmentInput);
                subDepartmentInput = '';
            }
            

        } catch(err) {
            console.log(err)
        }
    }
    
    



    let addDepartment = async() => {
        try{

        const departments = await axios.post('/api/admin/department', {name: name.value})
    
        console.log(departments.data)

        window.location.reload()

        }catch(err){

            console.log(err)
        }
    }
    
    
definePageMeta
({
  middleware
: [ 
    'auth-admin',
  ],
});

    
    </script>
    
    <style scoped>
    </style>