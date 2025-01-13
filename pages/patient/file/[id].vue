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

      <div class="col-lg-5 col-xs-6 col-12 my-4">
                <div class="card profile-card shadow-sm" style="background-color:#dbfff0  ;">

                    <img class="card-img-top" :src="'data:image/jpeg;base64,' + doctor?.profilePhoto" alt="Profile Image">
                    <div class="card-body text-center">
                        <h2 class="card-title mb-3">{{ doctor?.name }} {{ doctor?.surname }}</h2>
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <div class="d-flex align-items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-journal-medical me-2" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v.634l.549-.317a.5.5 0 1 1 .5.866L9 6l.549.317a.5.5 0 1 1-.5.866L8.5 6.866V7.5a.5.5 0 0 1-1 0v-.634l-.549.317a.5.5 0 1 1-.5-.866L7 6l-.549-.317a.5.5 0 0 1 .5-.866l.549.317V4.5A.5.5 0 0 1 8 4m0 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
                                    <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2"/>
                                    <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z"/>
                                </svg>
                                <span style="font-size:larger">{{ doctor?.doctorType == 2 ? "Uzm.Dr" : doctor?.doctorType == 3 ? "Prof.Dr" : "Doç.Dr" }}</span>
                            </div>
                            <div class="d-flex align-items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-geo-alt me-2" viewBox="0 0 16 16">
                                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                                </svg>
                                <span style="font-size:larger">{{ doctor?.country }}</span>
                            </div>
                            
                        </div>
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <div class="d-flex align-items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-journal-medical me-2" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v.634l.549-.317a.5.5 0 1 1 .5.866L9 6l.549.317a.5.5 0 1 1-.5.866L8.5 6.866V7.5a.5.5 0 0 1-1 0v-.634l-.549.317a.5.5 0 1 1-.5-.866L7 6l-.549-.317a.5.5 0 0 1 .5-.866l.549.317V4.5A.5.5 0 0 1 8 4m0 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
                                    <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2"/>
                                    <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z"/>
                                </svg>
                                <span style="font-size:larger">{{ doctor?.specialization}}</span>
                            </div>

                            <div class="d-flex align-items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                class="text-warning me-3"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  d="M3.612 15.443c-.396.198-.865-.149-.746-.592l.83-4.73-3.523-3.356c-.33-.314-.158-.888.283-.95l4.898-.696 2.18-4.327c.197-.39.73-.39.927 0l2.18 4.327 4.898.696c.441.062.613.636.283.95l-3.523 3.356.83 4.73c.119.443-.35.79-.746.592L8 13.187l-4.389 2.256z"
                                />
                              </svg>
                                <span style="font-size:larger">{{ averageRating.toFixed(2) }}</span>
                            </div>
                            
                        </div>
                        <div class="d-flex justify-content-center align-items-center mb-3">
                          <div class="d-flex align-items-center col-12 mt-5">
  </div>
</div>

                    </div>
                </div>
            </div>


      <div
        class="col-xl-6 col-11 col-lg-6 col-md-8 col-sm-10 m-auto my-4"
        style="max-width: 850px"
      >
        <div class="card diagnosis-card shadow-lg">
          <div class="card-body p-4">

            <div class="mb-4">
              <h5 class="card-title">Complaint</h5>
              <p class="card-text text-dark">{{ file?.complaint }}</p>

              <h5 class="card-title">Known Conditions</h5>
              <p class="card-text text-dark">{{ file?.knownConditions }}</p>

              <!-- Files Section -->
              <div class="mb-5">
                <h5 class="card-title">Files</h5>
                <div
                  v-if="file?.documents?.length > 0"
                  class="d-flex flex-wrap row"
                >
                  <div
                    class="col-lg-4 col-6"
                    v-for="(value, key) in file?.documents"
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
            v-if="file?.summaryDiagnosis  && file?.meetingDate"
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
            v-if="file?.summaryDiagnosis  && file?.meetingDate"
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
            v-if="file?.detailedDiagnosis  && file?.meetingDate"
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
            v-if="file?.detailedDiagnosis && file?.meetingDate"
            class="col-12 p-1 px-3 text-dark"
            style="
              word-wrap: break-word;
              border-radius: 16px;
              background-color: #9dfecf;
            "
          >
            <p>{{ file?.detailedDiagnosis }}</p>
          </div>
          <div
            v-if="!file?.meetingDate"
            class="col-12 m-0 p-0 mb-1 ms-2 mt-4"
          >
            <p
              class="p-0 m-0"
              style="color: #615ef0; font-size: 16px; font-weight: 500"
            >
              Waiting Diagnosis...
            </p>
          </div>
          <div v-if="!file?.diagnosis" class="col-12 m-0 p-0 mb-1 mt-4 p-0">
            <div class="row d-flex justify-content-between">
              <div v-if="(!(!file?.meetingDate && !file?.summaryDiagnosis && !(file?.requiresSecondOpinion && file?.summaryDiagnosis && !file?.consultText && file?.consultingDoctor && !file?.meetingDate)) && file?.meetingDate)" class="col-6">
               <span style="color:#615ef0" >Meeting Date: </span> <span>{{ file?.meetingDate?.split('T')[0] }} | {{  file?.meetingDate?.split('T')[1].split(':')[0]  }}:{{  file?.meetingDate?.split('T')[1].split(':')[1]  }}</span>
              </div>
              <button
                v-if="file?.meetingDate"
                type="button"
                style=""
                class="btn btn-sm btn-success col-3"
                @click="navigateTo(`/webrtc/?roomID=${fileId}`)"
              >
                Go Meeting
              </button>
              <button
                 v-if="file?.meetingDate && !file?.rate"
                type="button"
                style=""
                class="btn btn-sm btn-warning col-2 me-4"
                @click="navigateTo(`/patient/file/rate/${fileId}`)"
              >
                Rate
              </button>

             

              </div>
            </div>
           
          </div>
        </div>

      </div>
      <div class="card shadow-lg border-0 col-10 mx-auto d-flex justify-content-center">
      <div class="card-header text-white text-center">
        <h5 class="mb-0">Comments</h5>
      </div>
      <div class="card-body">
        <div
          v-for="(comment, index) in doctor?.comments"
          :key="index"
          class="comment-card p-3 mb-3 rounded bg-light shadow-sm"
        >
          <div class="d-flex justify-content-between align-items-center mb-2">
            <div class="d-flex align-items-center">
              <span
                v-for="star in 5"
                :key="star"
                class="me-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  fill="currentColor"
                  :class="star <= doctor.rates[index] ? 'text-warning' : 'text-secondary'"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M3.612 15.443c-.396.198-.865-.149-.746-.592l.83-4.73-3.523-3.356c-.33-.314-.158-.888.283-.95l4.898-.696 2.18-4.327c.197-.39.73-.39.927 0l2.18 4.327 4.898.696c.441.062.613.636.283.95l-3.523 3.356.83 4.73c.119.443-.35.79-.746.592L8 13.187l-4.389 2.256z"
                  />
                </svg>
              </span>
            </div>
            <span class="text-muted small">
              Comment #{{ index + 1 }}
            </span>
          </div>
          <p class="mb-0">{{ comment }}</p>
        </div>
      </div>
    </div>
    </div>
</template>

<script setup>
import axios from "axios";
let fileId = useRoute().params.id;

let { pending, data: file, status } = await useLazyFetch(`/api/file/${fileId}?userType=patient`);
let { pending2, data: doctor, status2 } = await useLazyFetch(`/api/case/${fileId}/doctor`);
let comments = ref(["qweqwe", "qweqwe" , "asdasdasd"])
console.log(file)
console.log("file => " + JSON.stringify(file))

let selectedFiles = ref([]);
let isFileVisible = ref(false);
let currentFilePath = ref("");
let fileType = ref("");
let currentKey = ref(null);

console.log(doctor.value.rates.length)


let averageRating = computed( () => {
  if(doctor.value.rates.length > 0){
    let result = 0;
  for(let rate in doctor.value.rates){
    console.log(rate)
    result += parseInt(doctor.value.rates[rate]);
  }
  console.log(doctor.value.rates)
  return result / doctor.value.rates.length
  }
})

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

.comment-card {
}

/* Hover efekti */
.comment-card:hover {
    transform: scale(1.02); /* Kartı biraz büyüt */
    background-color: #e9ffef; /* Hafif bir arka plan vurgusu ekle */
}

/* Kart başlığı */
.card-header {
    background: linear-gradient(90deg, #81d8bb, #83dbaf);
    color: white;

}

/* Yumuşak gölgeler */
.shadow-lg {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06);
}

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
