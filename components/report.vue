<template >

            
                <div class="card text-center" style="width: 269px; height: 145px; display:flex;">
                    <span class="m-auto card-text text-center mx-2 text-truncate btn" :data-bs-target="`#exampleModal${props.id}`" data-bs-toggle="modal" style="padding-bottom:15px;">{{chatMessage}}</span>

                    
                    <NuxtLink v-if="userType != 'null'" :to="`/${userType}/${routeName}/${id}`"> <button class="btn-sm card-button position-absolute p-0" style="top: calc(90%); left: 50%; transform: translateX(-50%); color:#ECFDF5">View Details</button></NuxtLink>
                    <NuxtLink v-else :to="`/${routeName}/${id}`"> <button class="btn-sm card-button position-absolute p-0" style="top: calc(90%); left: 50%; transform: translateX(-50%); color:#ECFDF5">View Details</button></NuxtLink>
 
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

                </div>

</template>

<script setup>
const props = defineProps(['chatMessage' , 'date' ,'id' , 'routeName' , 'userType'])
</script>

<style scoped>
.card {
    height: 145px;
    max-height: 100%;
    border-radius: 24px;
    border-color: #34D399;
    background-color: #DAFBEB;
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
