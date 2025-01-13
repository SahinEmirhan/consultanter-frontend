<template>

  <div class="container">
    <div class="row">
      <!-- Header -->
      <div  class="chat-container col-lg-8 col-sm-10 col-11 mx-auto">
        <div class="row chat-header">
          <div  class="col-6 d-flex align-items-center">
            <!---<div :class="file?.closure ? 'close' : 'status-indicator'"></div>
            <span>Status: {{ file?.closure ? 'Closed' : 'Open' }}</span>-->
          </div>
          <div class="col-6 d-flex align-items-center justify-content-end" v-if="!isClose">
            <button @click="closeComplaint" class="btn btn-danger">Close</button>
          </div>
          <div class="col-6 d-flex align-items-center justify-content-end" v-if="isClose">
            <h2>Closed</h2>
          </div>
        </div>

        <!-- Chat Box -->
        <div ref="chatBox" class="chat-box m-0 p-2">
            <!-- Sender Message -->
            <template v-for="(item, key) in file" :key="key" >
              <div :class="item.userType == userType ? 'col-md-6 offset-md-6 col-12 d-flex justify-content-end' : 'col-12 d-flex row'" class="p-1">
                <div :class="item.userType == userType ? 'sender' : 'receiver col-12 col-md-6 p-2'" class="message">
                  <img v-if="file[key]?.userType != file[key-1]?.userType" class="profile-img" src="https://s3.amazonaws.com/37assets/svn/765-default-avatar.png" />
                  <div v-else style="width: 40px; height: 40px; margin: 0 12px;"></div>
                  <div :class="item.userType == userType ? 'text-start' : ''" class="message-content" :style="item.userType == userType ? '' : 'background-color: #D3f0f0;'">
                    <p>{{ item.message }}</p>
                  </div>
                </div>
              </div>
            </template>



          </div>

        <!-- Input Area -->
        <div class="row input-area" v-if="!isClose">
          <div class="col-12 d-flex align-items-center">
            <input @keydown.enter="sendMessage" v-model="message" type="text" placeholder="Write Your Message...">
            <button @click="sendMessage" class="send-btn d-flex">
              <img src="https://img.icons8.com/material-outlined/24/ffffff/sent.png" alt="Send">
            </button>
          </div>
        </div>



      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCookie } from '#app';
import { Client } from "@stomp/stompjs";
import axios from 'axios';



let fileId = useRoute().params.id;
let userType = ref('');
let message = ref();
let problemMessage = ref('');
let isClose = ref(false);

let { pending, data: file, status } = await useLazyFetch(`/api/complaint/${fileId}`);
//console.log('file => ', file);
userType.value = useCookie('userType').value;

const chatBox = ref(null); // Chat kutusuna referans

// Scroll'u en aşağıya kaydıran fonksiyon
const scrollToBottom = () => {
const chatBoxElement = chatBox.value;
if (chatBoxElement) {
chatBoxElement.scrollTop = chatBoxElement.scrollHeight;
}
};

if(file.value){
  file.value.forEach(element => {
  if(element.message == 'Close/'){
    isClose.value = true;
  }
});

}



const stompClient = new Client({
brokerURL: "ws://localhost:9090/consultanter",
debug: function (str) {
  console.log("STOMP Debug: ", str);
},
});

stompClient.onConnect = (frame) => {
console.log("Connected: " + frame);
stompClient.subscribe(
  `/topic/complaint/${fileId}`,
  (response) => {
    console.log("here")
    console.log(response.body);



    //websocketten gelen mesajı parse etme fonksiyonu
    const parseMessage = (body) => {
      const match = body.match(/Message\(id=(\d+), message=(.*?), userType=(.*?)\)/);
      if (match) {
        if(match[2] == "Close/"){
            isClose.value = true;
          }
        return {
          id: parseInt(match[1], 10),
          message: match[2],
          userType: match[3],
        };
      }
      return null;
    };

    const newMessage = parseMessage(response.body);
    file.value.push(newMessage)
    setTimeout(scrollToBottom, 50); // Scroll'u güncelle
  }
);

};

stompClient.onWebSocketError = (error) => {
console.error("Error with websocket", error);
};

stompClient.onStompError = (frame) => {
console.log(frame)
console.error("Broker reported error: " + frame.headers["message"]);
console.error("Additional details: " + frame.body);
};


stompClient.activate();



function sendMessage() {
stompClient.publish({
  destination: `/app/complaint/${fileId}`,
  body: message.value ,
});

message.value = "";
setTimeout(scrollToBottom, 50); // Scroll'u güncelle
}


async function closeComplaint() {
  const response = await axios.get(`/api/admin/complaint/${fileId}`);
  console.log(response.data)

  stompClient.publish({
  destination: `/app/complaint/${fileId}`,
  body: "Close/" ,
});
}


</script>

<style scoped>
.chat-container {
  margin: auto;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  background-color: #e8fff0; /* Very light green background */
}

.chat-header {
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: #e8fff0; /* Light green for header */
  border-bottom: 2px solid #C5E5C9;
}

.close {
  background-color: #e11616;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 12px;
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 12px;
  background-color: #4CAF50; /* Green for Open status */
}

.chat-box {
  min-height: 400px; /* Increased minimum height for the chat box */
  max-height: 600px; /* Increased maximum height for the chat box */
  overflow-y: auto;
  padding: 12px;
  background: #e8fff0; /* Very light green */
  border-top: 2px solid #C5E5C9;
  scrollbar-width: thin; /* For Firefox */
  scrollbar-color: #bfffd8 #e8fff0; /* For Firefox */
}

.message {
  display: flex;
  align-items: flex-start;
}

.message.sender {
  flex-direction: row-reverse;
  text-align: right;
}

.message.receiver {
  text-align: left;
}

.profile-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0 12px;
}

.message-content {
  display: inline-block;
  padding: 12px;
  border-radius: 20px;
  background: #bfffd8; /* Slightly greenish background for messages */
  position: relative;
}

.message-content p {
  margin: 0;
}

.message-date {
  font-size: 0.8rem;
  color: #a5a5a5;
  display: block;
  text-align: right;
  margin-top: 5px;
}

.input-area {
  display: flex;
  padding: 12px;
  border-top: 2px solid #C5E5C9;
  background: #e8fff0; /* Matching the background color */
}

.input-area input {
  flex: 1;
  border-radius: 20px;
  border: 1px solid #C5E5C9;
  padding: 12px;
}

.input-area .send-btn {
  background: #75eaa2;
  border: none;
  border-radius: 50%;
  padding: 12px;
  margin-left: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.input-area .send-btn img {
  width: 24px;
  height: 24px;
}

/* Custom scrollbar styling */
.chat-box::-webkit-scrollbar {
  width: 8px; /* Width of the scrollbar */
}

.chat-box::-webkit-scrollbar-thumb {
  background-color: #bfffd8; /* Color of the scroll thumb */
  border-radius: 10px; /* Rounded corners */
}

.chat-box::-webkit-scrollbar-track {
  background: #e8fff0; /* Background color of the scroll track */
}
</style>
