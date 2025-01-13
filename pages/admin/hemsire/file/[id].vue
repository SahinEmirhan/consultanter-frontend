<template>
  <div v-if="pending">
    <p>Loading...</p>
  </div>

  <div
    v-else
    class="col-xl-6 col-11 col-lg-6 col-md-8 col-sm-10 m-auto my-4"
    style="max-width: 850px"
  >
    <div class="card diagnosis-card shadow-lg">
      <div class="card-body p-4">
        <!-- Complaint Section -->
        <div class="mb-4">
          <h5 class="card-title">Complaint</h5>
          <p class="card-text text-dark">
            {{ tempFiles.complaint }}
          </p>
        </div>

        <!-- Files Section -->
        <div class="mb-5">
          <h5 class="card-title">Files</h5>
          <div
            v-if="tempFiles.documents.length > 0"
            class="d-flex flex-wrap row"
          >
            <div
              class="col-lg-4 col-6"
              v-for="(value, key) in tempFiles.documents"
              :key="key"
              style="text-decoration: none"
            >
              <div
                class="file-box m-2"
                :class="{ selected: selectedFiles.includes(key) }"
                @click="showPdf(value.filePath, key)"
              >
                <span class="file-link text-dark">File {{ key + 1 }}</span>
              </div>
            </div>
          </div>
          <div v-else>
            <p>Yüklenen Herhangi Bir Dosya Bulunmamaktadır.</p>
          </div>
        </div>

        <!-- Custom Modal -->
        <div v-if="isFileVisible" class="pdf-viewer">
          <div class="overlay" @click="hideFile"></div>
          <div class="pdf-container">
            <iframe
              v-if="fileType === 'PDF'"
              :src="currentFilePath"
              width="900px"
              height="600px"
              frameborder="0"
            ></iframe>
            <img
              v-if="fileType === 'PNG' || fileType === 'JPEG/JPG'"
              :src="currentFilePath"
              width="600px"
              height="600px"
              fit="cover"
              alt="Image"
            />
            <button class="close-btn" @click="hideFile">×</button>
          </div>
        </div>

        <!-- Department Selection Section -->
        <div class="d-flex align-items-center mt-4">
          <div class="flex-grow-1 me-2">
            <div class="input-group input-group-sm">
              <select
                v-show="!isFileVisible"
                v-model="department"
                class="form-select"
                aria-label="Default select example"
              >
                <option selected>Please Choose A Department</option>
                <option v-for="dep in departments" :value="dep.name">
                  {{ dep.name }}
                </option>
              </select>
            </div>
          </div>
          <div>
            <button @click="setDepartment" class="btn btn-success">
              Direct
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const fileId = useRoute().params.id;
let {
  pending,
  data: tempFiles,
  status,
} = await useLazyFetch(`/api/admin/nurse/directFile/${fileId}`);
console.log("tempfiles -> " + tempFiles.value);
let selectedFiles = ref([]);
let isFileVisible = ref(false);
let currentFilePath = ref("");
let fileType = ref("");
let currentKey = ref(null);

function dosyaTipiBelirle(base64Verisi) {
  try {
    const binaryVeri = atob(base64Verisi); // Base64 çözme
    const magicBytes = binaryVeri.slice(0, 8); // İlk 8 byte

    if (magicBytes.startsWith("%PDF")) {
      return "PDF";
    } else if (
      magicBytes.charCodeAt(0) === 0xff &&
      magicBytes.charCodeAt(1) === 0xd8
    ) {
      return "JPEG/JPG";
    } else if (
      magicBytes.charCodeAt(0) === 0x89 &&
      magicBytes.charAt(1) === "P" &&
      magicBytes.charAt(2) === "N" &&
      magicBytes.charAt(3) === "G"
    ) {
      return "PNG";
    } else {
      return "Bilinmeyen format";
    }
  } catch (e) {
    return `Geçersiz Base64 verisi: ${e.message}`;
  }
}

const showPdf = (data, key) => {
  currentKey.value = key;
  isFileVisible.value = true;
  fileType.value = dosyaTipiBelirle(data);
  if (fileType.value === "PDF") {
    currentFilePath.value = `data:application/pdf;base64,${data}`;
  } else if (fileType.value === "PNG") {
    currentFilePath.value = `data:image/png;base64,${data}`;
  } else if (fileType.value === "JPEG/JPG") {
    currentFilePath.value = `data:image/jpeg;base64,${data}`;
  } else {
    currentFilePath.value = "dosya geçerli formatta değil";
  }
};

// PDF'yi kapatma fonksiyonu
const hideFile = () => {
  isFileVisible.value = false;
  currentFilePath.value = "";
};

function toggleFile(key) {
  if (selectedFiles.value.includes(key)) return;
  else selectedFiles.value.push(key);
}

let { data: departments } = await useLazyFetch("/api/admin/department");

let department = ref("");

let setDepartment = async () => {
  console.log("department : " + department.value + "\n" + "id : " + fileId);
  let approve = await $fetch("/api/admin/nurseFiles", {
    method: "POST",
    body: {
      id: fileId,
      department: department.value,
    },
  });

  console.log(approve);
  if (approve == "success") {
    return navigateTo("/admin/nurse");
  } else {
    console.log("işlem başarılı değil");
  }
};
</script>

<style scoped>
.card {
  background-color: #dbfff0;
  border-radius: 12px;
  padding: 1.5rem;
}
.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #088e3b;
  border-bottom: 2px solid #a9fed2;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}
.card-text {
  font-size: 1rem;
  color: #333;
  line-height: 1.6;
}
.card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
.file-box {
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
.file-box:hover {
  background-color: #f1f8ff;
}
.pdf-viewer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;
}
.pdf-container {
  min-width: 500px;
  min-height: 500px;
  position: relative;
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 1001;
}
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #f44336;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1001;
}
.close-btn:hover {
  background: #d32f2f;
}
</style>
