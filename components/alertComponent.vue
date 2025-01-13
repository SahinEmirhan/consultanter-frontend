<template>


<div>
  
  <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
    <Transition name="fade">
      <div v-if="isVisible" id="liveToast"  class="toast show text-light" :class="status == false ? 'bg-danger' : 'bg-success'" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <img :src="status == false ?  'https://cdn-icons-png.flaticon.com/512/463/463612.png' :'https://cdn-icons-png.flaticon.com/512/190/190411.png ' " style="max-height:20px" class="rounded me-2" alt="...">
          <strong class="me-auto">{{props.headMsg}}</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          {{props.msg}} 
        </div>
      </div>
    </Transition>
  </div>

</div>

    

    
  </template>


<script setup>
let isVisible = ref(false)
let props = defineProps(['msg' , 'headMsg' , 'status'])
onMounted(() => {
setTimeout(()=>{
isVisible.value = true
} , 100)
setTimeout(() => {
  isVisible.value = false
} , 14000)
})
</script>

<style>
@media (max-width: 767.98px) {
  #liveToast {
    position: fixed;
    top: 2%;
    left: 50%;
    transform: translateX(-50%);
    width: 70%;
    z-index: 11;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>