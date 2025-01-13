

<template>
<div class="row">
    <div class="col-12">
        <div class="row p-0 m-0">
            <p class="col-6 m-0 p-0 text-start d-inline-block" style="font-size:14px; font-weight:500; color:#615EF0">Status : {{ closure ? 'Close' : 'Open' }}  </p>
            <p class="col-6 m-0 p-0 text-end d-inline-block" style="font-size:14px; font-weight:500; color:#615EF0"> {{ new Date(props.date).getDay() }}/{{ new Date(props.date).getMonth() }}/{{ new Date(props.date).getFullYear()}}</p>        </div>
    </div> 
    <div>
        <div class="px-4 py-4 chat-box" style="background-image: linear-gradient(to bottom right, #DAFBEB, #74FFBC); border-top-left-radius:16px; border-top-right-radius:16px;">
            <!-- Sender Message-->
            <div class="media w-50 mb-2" :class="(item.senderType == messages[0].senderType) ? 'offset-6' : '' " v-for="(item, index) in messages" :key="item._id">
                <img src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg" alt="user" width="50" class="rounded-circle" 
                v-if="(item.senderType != messages[0].senderType) && (messages[index-1]?.senderType != messages[index]?.senderType)">
                <div class="media-body ml-3 text-dark">
                    <div class="bg-light rounded px-1 row" style="word-wrap: break-word;">
                        <p class="text-small my-0 mx-3 my-1">{{item.message}}</p>
                        <p class="small text-muted m-0 p-0 text-end col-12" style="font-size:11px">{{ calcMessageDate(item.date) }}</p>
                    </div>
                    <!-- Form -->
        
                </div>
                
            </div>
        
        </div>
        <div v-if="!closure || status == 'Open' " class="input-group mb-1">
            <input @keydown.enter="sendMessage(message)" v-model="message" type="text" class="form-control" placeholder="Write Your Message...">
            <div class="input-group-append">
            <button @click="sendMessage(message)" class="btn btn-light" type="submit"><img width="24" height="24" src="https://img.icons8.com/pulsar-line/48/filled-sent.png" alt="filled-sent"/></button>
            </div>
        </div>
    </div>
    </div>
</template>

<script setup>
import axios from 'axios'
const emit = defineEmits();
const props = defineProps(['messages' , 'status' , 'closure', 'id' , 'type' , 'date'])
const message = ref('')
const calcMessageDate = (date) => {
      if(date){
        const hour = date.split('T')[1].split(':')[0];
        const minute = date.split('T')[1].split(':')[1];
        let month = date.split('T')[0].split('-')[1];
        const day = date.split('T')[0].split('-')[2];
        const year = date.split('T')[0].split('-')[0];

        const month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

        if(month.split('')[0] == '0'){
          month = month.split('')[1] ;
          console.log(month)
        }
      return (` ${day} ${month_names_short[month - 1]} ${year} | ${hour}:${minute}`)
      }
    }
  
    // This would be called anytime the value of title changes
   
      // you can do anything here with the new value or old/previous value
      const sendMessage = async(message) => {
        console.log('message :>> ', message);
    if(!props.closure || props.status == 'Open')
    {
        await axios.post(`http://localhost:3000/${props.type}/${props.id}` , {message : message} , {withCredentials:true}).then(response => {
        if(response.status == 200)
        {
          const today = new Date();
          const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
          const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
          const dateTime = date +'T'+ time;
            props.messages.push({message : message , senderType : 'Doctor' , date: dateTime })
        }
    })
    }
    else{
        console.log('File is Closed')
    }
    
}
</script>

<style scoped>
/* Input üzerindeki mavi çerçeve */
.input-group.mb-1 input[type="text"].form-control:focus {
    outline: none !important;
    border: 1px solid lightgray;
    box-shadow: none !important;
}



::-webkit-scrollbar {
  width: 2px;
}

::-webkit-scrollbar-track {
  width: 2px;
  background: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  width: 1em;
  background-color: rgb(147, 248, 184);
  outline: 1px solid rgb(90, 241, 166);
  border-radius: 1rem;
}

.text-small {
  font-size: 0.9rem;
}

.messages-box,
.chat-box {
  height: 510px;
  overflow-y: scroll;
}

.rounded-lg {
  border-radius: 0.5rem;
}

input::placeholder {
  font-size: 0.9rem;
  color: #999;
}

</style>