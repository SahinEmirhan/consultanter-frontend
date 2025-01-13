<template>

{{ problemMessage }}

        <div class="row mt-5">
        {{ messages }}

        <input type="text" v-model="message">
            <button @click="sendMessage"> send message</button>
           
        </div>
      
</template>

<script setup>
import axios from 'axios'
import { io } from "socket.io-client";
import Cookies from 'js-cookie';

let fileId = useRoute().params.id

let message = ref('');
let messages = ref([]);
let problemMessage = ref('');


 const chatSocket = io('http://localhost:3800/chat', {
    extraHeaders: {
        Authorization: `Bearer ${Cookies.get('token')}`,
    },
    query: {
        fileId:fileId
    }

});



chatSocket.on('connect', () => {
    console.log('Connected to the chat namespace');
});


chatSocket.on('sentMessage', (message) => {
    messages.value.push(message);    
});

chatSocket.on('fullMessages', (message) => {
    messages.value = message.chat
});

chatSocket.on('connect_error', (err) => {

  problemMessage.value = err;

});



function sendMessage() {
    chatSocket.emit('sendMessage', message.value);
}


</script>


<style scoped>

</style>