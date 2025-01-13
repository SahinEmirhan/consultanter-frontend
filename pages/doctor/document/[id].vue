<template>
    <div style="min-height:50rem;">

      <div class="d-flex justify-content-center align-items-center spinner-grow " style="position:absolute; left:50%; top: 35%; background-color:#ECFDF5;" v-if="!document">
          <div class="row">
            <div class="col-12">
              <img src="/logo.png" style="width: 20rem; height: 20rem;" role="status" alt="">
              </div>
              <div class="col-12 text-center">
              <h1 style="color:#064E3B"><strong>LOADING...</strong></h1>
            </div> 
          </div>
        </div>
        <div v-else class="d-flex justify-content-center">
       
          <ClientOnly>

            <NuxtImg v-if="documentValues.type.startsWith('image')" :src="getBase64Image(document)" alt="Medical Document" />
            <iframe  v-if="documentValues.type.startsWith('application')" :src="getPdfUrl(document)" alt="Medical Document" width="100%" height="800px"> </iframe>

          </ClientOnly>

        </div>
    </div>
  </template>
  
  <script setup>
  import axios from 'axios'
  let route  = useRoute();
  let documentId = route.params.id
  let fileId = route.query.file


  let { pending, data: documentValues, status } = await useLazyFetch(`/api/download/fileInfo/${documentId}?info=fileDocumentInfo&file=${fileId}`)


  let { pending3, data:document, error, refresh } = await useLazyAsyncData(
  async () =>{ 
    try {


     let response = await DownloadFile(documentId, documentValues.value.chunkSize, fileId);
     return response;

    } catch(error) {
      console.log(error)
    }

  }, {
    server: false
}
)
  





let uploading = ref()

async function DownloadFile(fileName, totalChunks, fileId) {
  uploading.value = true;

  try {

    let bufferList = [];

    for (let i = 1; i <= totalChunks; i++) {
      let chunk = await DownloadChunkWithRetry(fileName, i, fileId);
      bufferList.push(chunk.data)

    }
    uploading.value = false;
    return bufferList;
  } catch (error) {
    console.error('Download error:', error);
    uploading.value = false;
  }
}


async function DownloadChunkWithRetry(fileName, currentChunk, fileId) {
 let attempts = 0;
 let maxAttempts = 10;
 let delay = 1000;
 let response;

 while (attempts < maxAttempts) {
   try {
     response = await DownloadChunk(fileName, currentChunk, fileId);
     

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

let DownloadChunk = async (fileName, chunk, fileId) => {
 try {

   let response = await axios.get(`/api/download/${fileName}?chunk=${chunk}&file=${fileId}&db=fileDocument`,  {
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
 

  </script>
  
  <style scoped>
.spinner-grow {
    animation-duration: 4.7s;
}
.footer{
      margin-top:50%;
    }

</style>
  