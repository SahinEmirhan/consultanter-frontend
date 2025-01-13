<template>


<div v-if="pending">
            <p >Loading...</p>
          </div>
  <div v-else class="container mt-4">
    <h1 style="color:#064E3B;" class="mb-4 text-center"  >Hasta Şikayetleri</h1>
    <div class="d-flex justify-content-end mb-3">
      <button @click="sortComplaints" class="btn btn-sm" style="background-color:#2BBD88; color:white">
        Sırala: {{ !isAscending ? 'Yeniden Eskiye' : 'Eskiden Yeniye' }}
      </button>
    </div>
    <div class="row">
      <div v-for="file in files.files" :key="file.id" class="col-md-4 mb-4">
        <div class="card h-100 complaint-card" style="background-color:#dbfff0;">
          <div class="card-body d-flex flex-column justify-content-between">
            <div>
              <p class="complaint-text">{{ file.complaint }}</p>
            </div>
            <div class="d-flex justify-content-between align-items-center mt-3">
              <small class="text-muted">Geliş Tarihi: {{ file.date }}</small>
              <button @click="viewComplaint(file._id)" class="btn btn-primary btn-sm">İncele</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'




let { pending, data: files, status  } = await useLazyFetch('/api/admin/nurseFiles')


let id= ref('');
let department= ref('');

let setDepartment = async() => {

    let approve = await $fetch('/api/admin/nurseFiles', {
            method: 'POST',
                  body: {
                    id: id.value,
                    department: department.value
                            }
                        })

    console.log(approve);
}



// const files = ref([
//   { id: 1, complaint: 'Baş ağrısı ve mide bulantısı. Bu durum birkaç gündür devam ediyor ve özellikle sabahları daha şiddetli oluyor.', date: '2023-07-20' },
//   { id: 2, complaint: 'Yüksek ateş ve öksürük. Ateş özellikle akşamları artıyor ve öksürük kuru bir şekilde devam ediyor.', date: '2023-07-21' },
//   { id: 3, complaint: 'Karın ağrısı ve ishal. Bu durum yaklaşık bir haftadır sürüyor ve yemeklerden sonra daha da kötüleşiyor.', date: '2023-07-22' }
// ])

// const isAscending = ref(true)

// const sortedFiles = computed(() => {
//   return files.value.slice().sort((a, b) => {
//     if (isAscending.value) {
//       return new Date(a.date) - new Date(b.date)
//     } else {
//       return new Date(b.date) - new Date(a.date)
//     }
//   })
// })

// const sortComplaints = () => {
//   isAscending.value = !isAscending.value
// }

// const viewComplaint = (id) => {
//   // Buraya incele butonuna tıklandığında yapılacak işlemleri ekleyin
//   console.log("Şikayet ID:", id)
// }
</script>

<style scoped>
.container {
  max-width: 960px;
}

.complaint-card {
  background-color: #ffffff;
  border-left: 5px solid #34d399;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  padding: 20px;
}

.complaint-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.complaint-text {
  font-size: 1.1rem;
  color: #495057;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 15px;
}

.text-muted {
  font-size: 0.875rem;
  color: #6c757d;
}

.complaint-icon {
  color: #f59e0b;
  font-size: 2rem;
  margin-bottom: 10px;
}

.btn-primary {
  background-color: #34d399;
  border: none;
}

.btn-primary:hover {
  background-color: #2bbd88;
}

.btn-secondary {
  background-color: #6c757d;
  border: none;
}

.btn-secondary:hover {
  background-color: #5a6268;
}
</style>
