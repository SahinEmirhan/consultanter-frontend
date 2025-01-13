<template>
    <div v-if="pending">
      <p>Loading...</p>
    </div>
    <div v-else id="app" class="container mt-3">

      <h1 style="color: #064e3b" class="mb-4 text-center">Değerlendirilecek şikayetler</h1>
      <div class="d-flex justify-content-end mb-3">
        <button
          @click="sortComplaints"
          class="btn btn-sm"
          style="background-color: #2bbd88; color: white"
        >
          Sırala:
          <!--{{ !isAscending ? 'Yeniden Eskiye' : 'Eskiden Yeniye' }} -->
        </button>
      </div>
      <div class="row">
        <div class="row p-0" v-if="tempFiles != []">
          <div v-for="file in tempFiles" :key="file.id" class="col-md-4 mb-4">
            <div
              class="card h-100 complaint-card"
              style="background-color: #dbfff0"
            >
              <div class="card-body d-flex flex-column justify-content-between">
                <div>
                  <p class="complaint-text">{{ file.complaint }}</p>
                </div>
                <div
                  class="d-flex justify-content-between align-items-center mt-3"
                >
                  <small class="text-muted"
                    >Geliş Tarihi: {{ new Date(file.date).getDate() }}/{{
                      new Date(file.date).getMonth() < 10
                        ? `0${new Date(file.date).getMonth()}`
                        : new Date(file.date).getMonth()
                    }}/{{ new Date(file.date).getFullYear() }}</small
                  >
                  <div class="d-flex justify-content-end">
                    <a
                      style="text-decoration: none"
                      :href="`/doctor/reviewFile/${file.id}`"
                      ><button class="btn btn-primary btn-sm">View</button></a
                    >
                    <button
                      @click="activeFile.value = file"
                      type="button"
                      class="btn btn-sm btn-success ms-1"
                      data-bs-toggle="modal" :data-bs-target="'#modal_review'"
                    >
                      Make Review
                    </button>
                  </div>
                </div>
              </div>
            </div>



          </div>

        </div>

      </div>


      <div class="modal fade " :id="'modal_review'" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true" >
              <div class="modal-dialog modal-dialog-centered" >
                <div class="modal-content" style="background-color: #ECFDF5;">
                  <div class="modal-header"  >
                    <h1 class="modal-title fs-5" id="modalLabel">Şikayeti Değerlendir : {{ activeFile?.value?.complaint }}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <form>
                      <div class="mb-3">
                          <label for="message-text" class="col-form-label">Review Message : </label>
                          <textarea class="form-control" id="message-text" v-model="caseReviewDTO.reviewText"></textarea>
                      </div>
                      <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="sendConsult(false)">Reddet</button>
                    <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="sendConsult(true)">Onayla</button>
                  </div>
                    </form>
                  </div>
               </div>
            </div>
    </div>


    </div>
  </template>


  <script setup>
  import Cookies from "js-cookie";

  import { Client } from "@stomp/stompjs";

  const doctorToken = Cookies.get("token");

  let selectedFile = ref("");

  let activeFile = reactive({});

  let caseReviewDTO = reactive({
    caseId: "",
    reviewResult: "",
    reviewText: ""
})


  let {
    pending,
    data: tempFiles,
    status,
  } = await useLazyFetch("/api/doctor/reviewFiles");

  const specialization = useCookie("specialization");

  const stompClient = new Client({
    brokerURL: "ws://localhost:9090/consultanter",
    debug: function (str) {
  console.log("STOMP Debug: ", str);
},
  });

  stompClient.onConnect = (frame) => {
    //setConnected(true);
    console.log("Connected: " + frame);
    stompClient.subscribe(
      `/topic/consultant/department/${specialization.value}`,
      (response) => {
        console.log(response.body);
      }
    );

    stompClient.subscribe(`/topic/consultant/doctor/${specialization.value}`, (response) => {
      tempFiles.value = JSON.parse(response.body);
      console.log(response.body);
      tempFiles.value = tempFiles.value.filter(file => file.id !== JSON.parse(response.body).id);

    });
  };

  stompClient.onWebSocketError = (error) => {
    console.error("Error with websocket", error);
  };

  stompClient.onStompError = (frame) => {
    console.error("Broker reported error: " + frame.headers["message"]);
    console.error("Additional details: " + frame.body);
  };

    stompClient.activate();

  function sendConsult(onay) {
    caseReviewDTO.caseId = activeFile.value.id;
    caseReviewDTO.reviewResult = onay;
    stompClient.publish({
      destination: `/app/consultant/department/${specialization.value}`,
      body: JSON.stringify(caseReviewDTO),
    });
    tempFiles.value = tempFiles.value.filter(obj => obj.id !== activeFile.value.id)
  }

  </script>
