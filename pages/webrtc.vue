<template>
  <div id="root"></div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useHead } from '#app';

useHead({
  script: [
    {
      src: 'https://unpkg.com/@zegocloud/zego-uikit-prebuilt/zego-uikit-prebuilt.js',
      type: 'text/javascript',
      async: true,
    },
  ],
});

onMounted(() => {
  const checkScriptLoaded = setInterval(() => {
    if (window.ZegoUIKitPrebuilt) {
      clearInterval(checkScriptLoaded); // Script yüklendi, intervali temizle
      initializeZego(); // Zego ile işlemi başlat
    }
  }, 100); // 100ms'de bir kontrol et

  function initializeZego() {
    function getUrlParams(url) {
      let urlStr = url.split('?')[1];
      const urlSearchParams = new URLSearchParams(urlStr);
      const result = Object.fromEntries(urlSearchParams.entries());
      return result;
    }

    const roomID = getUrlParams(window.location.href)['roomID'] || (Math.floor(Math.random() * 10000) + "");
    const userID = Math.floor(Math.random() * 10000) + "";
    const userName = "userName" + userID;
    const appID = 1854977978;
    const serverSecret = "218ae8b47d0f0ffd5eace65217afbf7f";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userID, userName);

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: document.querySelector("#root"),
      sharedLinks: [{
        name: 'Personal link',
        url: window.location.protocol + '//' + window.location.host + window.location.pathname + '?roomID=' + roomID,
      }],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
      turnOnMicrophoneWhenJoining: true,
      turnOnCameraWhenJoining: true,
      showMyCameraToggleButton: true,
      showMyMicrophoneToggleButton: true,
      showAudioVideoSettingsButton: true,
      showScreenSharingButton: true,
      showTextChat: true,
      showUserList: true,
      maxUsers: 2,
      layout: "Auto",
      showLayoutButton: false,
    });
  }
});
</script>

<style scoped>
  #root {
    width: 100vw;
    height: 100vh;
  }
</style>
