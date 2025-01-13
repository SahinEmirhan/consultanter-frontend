<template>
  <div>
    <h1>DOCTOR PDF</h1>

      <div v-if="pending3">
        Loading ...
      </div>
      <div v-else>
     
        <ClientOnly>

          <NuxtImg v-if="documentValues.type.startsWith('image')" :src="getBase64Image(document)" alt="Medical Document" style="width: 500px;" />
          <iframe  v-if="documentValues.type.startsWith('application')" :src="getPdfUrl(document)" alt="Medical Document" width="100%" height="500px"> </iframe>

        </ClientOnly>

      </div>
  </div>
</template>

<script setup>
import axios from 'axios'
let route  = useRoute();
let documentId = route.params.id
let info = route.query.info
let db = info.replace('Info','')



let { pending, data: documentValues, status } = await useLazyFetch(`/api/admin/download/info/${documentId}?info=${info}`)


let { pending3, data:document, error, refresh } = await useLazyAsyncData(
async () =>{ 
  try {

   let response = await DownloadFile(documentId, documentValues.value.chunkSize);
   return response;

  } catch(error) {
    console.log(error)
  }

}, {
  server: false
}
)






let uploading = ref()

async function DownloadFile(fileName, totalChunks) {
uploading.value = true;

try {

  let bufferList = [];

  for (let i = 1; i <= totalChunks; i++) {
    let chunk = await DownloadChunkWithRetry(fileName, i, );
    bufferList.push(chunk.data)

  }
  uploading.value = false;
  return bufferList;
} catch (error) {
  console.error('Download error:', error);
  uploading.value = false;
}
}


async function DownloadChunkWithRetry(fileName, currentChunk, ) {
let attempts = 0;
let maxAttempts = 10;
let delay = 1000;
let response;

while (attempts < maxAttempts) {
 try {
   response = await DownloadChunk(fileName, currentChunk, );
   

   break; // Başarılı olursa döngüden çık
 } catch (error) {
   console.log('Chunk yükleme hatası:', error.message);
   attempts++;
   await new Promise(resolve => setTimeout(resolve, delay)); // Gecikme ekle
 }
}


if (attempts === maxAttempts) {
 console.error('Chunk yükleme başarısız:', currentChunk);
 // Hata mesajı göster veya daha ileri işlemler yap
}

return response;
}

let DownloadChunk = async (fileName, chunk, ) => {
try {


 let response = await axios.get(`/api/admin/download/${fileName}?chunk=${chunk}&db=${db}`,  {
responseType: 'arraybuffer'
});
 if (!response) {
   throw new Error('Chunk upload failed: ' + response.data.success);
  }


  return response
  
} catch (error) {
 throw new Error('Chunk upload failed: ' + error);
}

};


function getPdfUrl(pdfArrayBuffer) {
  let blob = new Blob(pdfArrayBuffer, { type: 'application/pdf' });
  let pdfUrl = URL.createObjectURL(blob);
  return pdfUrl;
}

function getBase64Image(document) {

    let blob = new Blob(document, { type: 'image/jpeg' }); // Adjust the type based on your image format
    let imageUrl = URL.createObjectURL(blob);
    return imageUrl;
  
}

 

definePageMeta
({
  middleware
: [
    'auth-admin',
  ],
});

</script>

<style scoped></style>
