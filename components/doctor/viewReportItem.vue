<template>
    <div class="row">
        <div  class="col-2 card border text-center">
            <p>{{file.complaint}}</p>
        </div>
        <div class="col-2 text-warning">
            
            <select v-if="!isConfirmed && status != 'Approved'"  v-model="itemStatus" class="form-select" aria-label="Default select example">
                    <option disabled value="">Change Status</option>
                    <option value="Rejected">Reject</option>
                    <option value="Approved">Approve</option>
            </select>
            <p class="ms-2 mt-3">Status : {{ itemStatus }}</p>
            
        </div>
        <div v-if="file.showRejectedButtons && !isConfirmed" class="col-1">
            <button @click="file.dispatch = false ; onConfirm()"  class="btn btn-sm btn-danger me-2">Close</button>
            <button @click="file.dispatch = true" class="btn btn-sm btn-info ">Dispatch</button>
        </div>

        <div v-if="file.dispatch && !isConfirmed" class="col-2">
                <select v-model="file.department" id="departmentSelect" class="form-select" aria-label="Default select example">
                    <option disabled value="">Choose Department</option>
                    <option >KBB</option>
                    <option >Nöroloji</option>
                    <option >Diş</option>
                </select>

               
        </div>

        <div v-if="status == 'Approved'" class="col-1">
            <NuxtLink :to="`/doctor/file/${file._id}`" type="button" class="btn btn-sm mt-1 btn-info">Details</NuxtLink>
        </div>

        <div v-if="(file.department || (status != 'Approved' && itemStatus == 'Approved')) && !isConfirmed " class="col-4 mt-1">
            <button @click="onConfirm" class="btn btn-sm btn-success ">Confirm</button>
        </div>
    </div>
</template>

<script setup>
import axios from "axios"
const emit = defineEmits()
const {file} = defineProps(["file"])
const itemStatus = ref(file.fileStatus)
const status = ref(file.fileStatus)

const isConfirmed = ref(false)
watch(() => itemStatus.value , (newValue , oldValue) => {
    file.showRejectedButtons = false;
    file.dispatch = false;
    file.department = "";
    if(itemStatus.value == "Rejected")
        file.showRejectedButtons = true;
})


//post
const onConfirm = async() => {
    const response = await axios.post(`http://localhost:3000/doctor/file/${file._id}` , {
        fileStatus : itemStatus.value,
        dispatch : file.dispatch,
        department : file.department,
     }, {withCredentials:true})
     
     if(response.status == 200)
     {
        isConfirmed.value = true;
        if(itemStatus.value == 'Rejected')
            emit('deleteRejectedFile' , file)
     }  
}  

</script>

<style scoped>

</style>