<template>

<div v-if="pending">
            <p >Loading...</p>
          </div>
    <div v-else id="app" class="container mt-5">
    
        <div class="row">
            <div class="row p-0" v-if="tempFiles != []">
            <div  v-for="file in tempFiles" :key="file.id" class="col-md-4 mb-4">
              <div class="card h-100 complaint-card" style="background-color:#dbfff0;">
                <div class="card-body d-flex flex-column justify-content-between">
                  <div>
                    <p class="complaint-text">{{ file.complaint }}</p>
                  </div>
                  
                
                  <div class="d-flex justify-content-between align-items-center mt-1">
                    <small class="text-muted">Arrival Date: {{ new Date(file.date).getDate() }}/{{ (new Date(file.date).getMonth()) < 10  ? `0${new Date(file.date).getMonth()}` : new Date(file.date).getMonth()  }}/{{ new Date(file.date).getFullYear() }}</small>
                    

                    <a style="text-decoration: none;" ><button @click="navigateTo(`/admin/hemsire/file/${file.id}`)" class="btn btn-success btn-sm mt-2 float-end">View Details</button></a>
                  </div>

                </div>
              </div>
            </div>
            </div>
          </div>


    </div>

</template>


<script setup>
 
    let { pending, data: tempFiles, status  } = await useLazyFetch('/api/admin/nurseFiles')
    let { data : departments} = await useLazyFetch('/api/admin/department')
    let id= ref('');
    let department = reactive({});

    let setDepartment = async(id) => {
      console.log("department : " + department[id] + "\n" + "id : " + id);
        let approve = await $fetch('/api/admin/nurseFiles', {
                method: 'POST',
                      body: {
                        id: id,
                        department: department[id]
                                }
                            })

        console.log(approve);
    }



</script>