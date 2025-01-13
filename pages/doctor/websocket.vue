<template>
  <div v-if="pending">
    <p>Loading...</p>
  </div>
  <div v-else id="app" class="container mt-3">
    <h1 style="color: #064e3b" class="mb-4 text-center">Hasta Şikayetleri</h1>
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
                    :href="`/doctor/confirmFile/${file.id}`"
                    ><button class="btn btn-primary btn-sm">View</button></a
                  >
                  <button
                    @click="sendName(file.id)"
                    type="button"
                    class="btn btn-sm btn-success ms-1"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
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

let {
  pending,
  data: tempFiles,
  status,
} = await useLazyFetch("/api/doctor/nurseFiles");

const specialization = useCookie("specialization");

const stompClient = new Client({
  brokerURL: "ws://localhost:9090/consultanter",
});

stompClient.onConnect = (frame) => {
  //setConnected(true);
  console.log("Connected: " + frame);
  stompClient.subscribe(
    `/topic/department/${specialization.value}`,
    (response) => {
      console.log(response.body);
      if (response.body) {
        tempFiles.value = tempFiles.value.filter(
          (file) => file.id !== JSON.parse(response.body).id
        );
      }
    }
  );

  stompClient.subscribe(`/topic/doctor/${specialization.value}`, (response) => {
    tempFiles.value = JSON.parse(response.body);
    console.log(response.body);
    //tempFiles.value = tempFiles.value.filter(file => file.id !== JSON.parse(response.body).id);
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


function sendName(id) {
  console.log("sendName parameter : " + id);
  stompClient.publish({
    destination: `/app/department/${specialization.value}`,
    body: JSON.stringify({ id: id }),
  });
}

</script>