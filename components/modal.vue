<template>
    <!-- Modal -->
    <div class="modal fade" :class="{ 'show': isActive }" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modalEle">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ image.originalname }}</h5>
            <button type="button" class="close" aria-label="Close" @click="closeModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div> 
          <div class="modal-body">
            <div @click="closeModal">
              <NuxtImg :src="getBase64Image(image)" :alt="image.originalname" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

<script setup>
const props = defineProps(["image", "modalRef"])


function getBase64Image(document) {
  const uint8Array = new Uint8Array(document.data);
  const base64 = btoa(String.fromCharCode.apply(null, uint8Array));
  return 'data:' + document.mimetype + ';base64,' + base64;

}

function getBase64PDF(document) {
    const uint8Array = new Uint8Array(document.data.data);
      const base64 = btoa(String.fromCharCode.apply(null, uint8Array));
      return 'data:' + document.mimetype + ';base64,' + base64;
        }


const isActive = ref(false);

const openModal = () => {
  isActive.value = true;
};

const closeModal = () => {
  isActive.value = false;
};

defineExpose({ openModal, closeModal, modalRef }); // Add modalRef here
</script>