<template>
  <div class="container" style="min-height: 36rem">
    <div
      class="d-flex justify-content-center align-items-center spinner-grow"
      style="position: absolute; left: 50%; top: 35%; background-color: #ecfdf5"
      v-if="pending"
    >
      <div class="row">
        <div class="col-12">
          <img
            src="/logo.png"
            style="width: 20rem; height: 20rem"
            role="status"
            alt=""
          />
        </div>
        <div class="col-12 text-center">
          <h1 style="color: #064e3b"><strong>Loading...</strong></h1>
        </div>
      </div>
    </div>

    <div v-else class="row mt-5">
      <div
        class="col-xl-6 col-11 col-lg-6 col-md-8 col-sm-10 m-auto my-4"
        style="max-width: 850px"
      >
        <div class="card diagnosis-card shadow-lg">
          <div class="card-body p-4">

            <div class="mb-4">
              <h5 class="card-title">Complaint</h5>
              <p class="card-text text-dark">{{ file.complaint }}</p>

              <h5 class="card-title">Known Conditions</h5>
              <p class="card-text text-dark">{{ file.knownConditions }}</p>

              <!-- Files Section -->
              <div class="mb-5">
                <h5 class="card-title">Files</h5>
                <div
                  v-if="file.documents.length > 0"
                  class="d-flex flex-wrap row"
                >
                  <div
                    class="col-lg-4 col-6"
                    v-for="(value, key) in file.documents"
                    :key="key"
                    style="text-decoration: none"
                  >
                    <div
                      class="file-box m-2"
                      :class="{ selected: selectedFiles.includes(key) }"
                      @click="showPdf(value.filePath, key)"
                    >
                      <span class="file-link text-dark"
                        >File {{ key + 1 }}</span
                      >
                    </div>
                  </div>
                </div>

                <div v-else>
                  <p>Yüklenen Herhangi Bir Dosya Bulunmamaktadır.</p>
                </div>
              </div>
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

          <div
            v-if="file?.summaryDiagnosis"
            class="col-12 m-0 p-0 mb-1 ms-2 mt-4"
          >
            <p
              class="p-0 m-0"
              style="color: #615ef0; font-size: 14px; font-weight: 500"
            >
              Summary Diagnosis
            </p>
          </div>
          <div
            v-if="file?.summaryDiagnosis"
            class="col-12 p-1 px-3 text-dark"
            style="
              word-wrap: break-word;
              border-radius: 16px;
              background-color: #9dfecf;
            "
          >
            <p>{{ file?.summaryDiagnosis }}</p>
          </div>

          <div
            v-if="file?.detailedDiagnosis"
            class="col-12 m-0 p-0 mb-1 ms-2 mt-4"
          >
            <p
              class="p-0 m-0"
              style="color: #615ef0; font-size: 14px; font-weight: 500"
            >
              Detailed Diagnosis
            </p>
          </div>
          <div
            v-if="file?.detailedDiagnosis"
            class="col-12 p-1 px-3 text-dark"
            style="
              word-wrap: break-word;
              border-radius: 16px;
              background-color: #9dfecf;
            "
          >
            <p>{{ file?.detailedDiagnosis }}</p>
          </div>
          <div v-if="file.consultText" class="mt-3">
              <h5 class="card-title">Consult Message</h5>
              <p class="card-text text-dark">{{ file?.consultText }}</p>
          </div>
          <div v-if="!file?.diagnosis" class="col-12 m-0 p-0 mb-1 ms-2 mt-4">
            <div class="row">
              <div v-if="(!(!file.meetingDate && !file.summaryDiagnosis && !(file.requiresSecondOpinion && file.summaryDiagnosis && !file.consultText && file.consultingDoctor && !file.meetingDate)) && file.meetingDate)" class="col-6">
               <span style="color:#615ef0" >Meeting Date: </span> <span>{{ file?.meetingDate?.split('T')[0] }} | {{  file?.meetingDate?.split('T')[1].split(':')[0]  }}:{{  file?.meetingDate?.split('T')[1].split(':')[1]  }}</span>
              </div>
              <button
              v-if="!file.meetingDate && !file.summaryDiagnosis && !(file.requiresSecondOpinion && file.summaryDiagnosis && !file.consultText && file.consultingDoctor && !file.meetingDate)"
                type="button"
                class="btn btn-sm btn-success col-4 m-auto me-3"
                style="background-color: #615ef0"
              >
                <NuxtLink
                  style="text-decoration: none"
                  class="text-light"
                  :to="{ path: `/doctor/file/dicom/${fileId}` }"
                  target="_blank"
                  >Dicom search up</NuxtLink
                >
              </button>
              <button
                v-if="!file.meetingDate && !file.summaryDiagnosis && !(file.requiresSecondOpinion && file.summaryDiagnosis && !file.consultText && file.consultingDoctor && !file.meetingDate)"
                type="button"
                style=""
                class="btn btn-sm btn-success col-4 m-auto ms-3"
                data-bs-toggle="modal"
                data-bs-target="#diagnosisModal"
              >
                Make Diagnosis
              </button>
              <button
                v-if="file?.meetingDate"
                type="button"
                style=""
                class="btn btn-sm btn-success col-4"
                @click="navigateTo(`/webrtc/?roomID=${fileId}`)"
              >
                Go Meeting
              </button>


              <div class="col-12 d-flex align-items-center justify-content-center p-0 m-0">


                  <input
                    class:="m-0 p-0"
                    v-if="file.requiresSecondOpinion && file.summaryDiagnosis && !file.consultText && file.consultingDoctor && !file.meetingDate "
                    type="datetime-local"
                    v-model="diagnosis.meetingDate"
                  />

                  <button @click="setMeetingDate" v-if="file.requiresSecondOpinion && file.summaryDiagnosis && !file.consultText && file.consultingDoctor && !file.meetingDate" class="btn btn-success btn-sm m-0"> Set Meeting Date</button>
                  </div>



              <div>







              </div>
            </div>
          </div>
        </div>

        <!-- Modal Start -->
        <div
          class="modal fade"
          id="diagnosisModal"
          tabindex="-1"
          aria-labelledby="diagnosisModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header" style="background-color: #ecfdf5">
                <h5 class="modal-title" id="diagnosisModalLabel">
                  Make a Diagnosis
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body" style="background-color: #ecfdf5">
                <form
                  :class="[
                    diagnosis.summaryDiagnosis.length <= 50 &&
                    diagnosis.summaryDiagnosis.length > 1
                      ? 'was-validated'
                      : '',
                  ]"
                >
                  <div class="mb-3">
                    <label for="message-text" class="col-form-label"
                      >Summary Diagnosis</label
                    >
                    <textarea
                      v-model="diagnosis.summaryDiagnosis"
                      class="form-control is-invalid"
                      id="message-text"
                      required
                    ></textarea>
                  </div>
                </form>

                <form
                  :class="[
                    diagnosis.detailedDiagnosis.length <= 3000 &&
                    diagnosis.detailedDiagnosis.length > 1
                      ? 'was-validated'
                      : '',
                  ]"
                >
                  <div class="mb-3">
                    <label for="message-text" class="col-form-label"
                      >Detailed Diagnosis</label
                    >
                    <textarea
                      v-model="diagnosis.detailedDiagnosis"
                      class="form-control"
                      id="message-text"
                    ></textarea>
                  </div>
                </form>

                <input
                  v-if="!file.requiresSecondOpinion"
                  type="datetime-local"
                  v-model="diagnosis.meetingDate"
                />
              </div>
              <div class="modal-footer" style="background-color: #ecfdf5">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  style="background-color: #19e399; border: none"
                  @click="sendData"
                  type="button"
                  :class="[
                    diagnosis.summaryDiagnosis.length > 50 ||
                    diagnosis.detailedDiagnosis.length > 3000
                      ? 'disabled'
                      : '',
                  ]"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- Modal End -->
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
let fileId = useRoute().params.id;
let diagnosis = ref({
  summaryDiagnosis: "",
  detailedDiagnosis: "",
  meetingDate: null,
});

let { pending, data: file, status } = await useLazyFetch(`/api/file/${fileId}?userType=doctor`);
// let { pending, data:file} = await useLazyAsyncData(`doctor_file_${fileId}` , async () => {
//   let file = await useFetch('/api/file' , {method : 'get' , body:{fileId : fileId}})
//   file.data.date = file.data.date.split('T')[0]

//   return file
// },
// {
//   server: false
// })

async function sendData() {
  try {
    /*
    diagnosis.value.meetingDate =
      diagnosis.value.meetingDate != null ? new Date(diagnosis.value.date) : null;
      */

    let response = await axios.post(
      `/api/doctor/diagnosis/${fileId}`,
      diagnosis.value
    );
    window.location.reload();
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}

async function setMeetingDate() {
  try {

    diagnosis.value.summaryDiagnosis = file.value.summaryDiagnosis;
    diagnosis.value.detailedDiagnosis = file.value.detailedDiagnosis;

    let response = await axios.post(
      `/api/doctor/diagnosis/${fileId}`,
      diagnosis.value
    );
    window.location.reload();
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}

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
