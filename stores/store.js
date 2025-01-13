import { defineStore } from 'pinia'
import axios from 'axios'
import nuxtStorage from 'nuxt-storage';
import AES from 'crypto-js';

const baseURL = 'http://localhost:3000'

export const usePatientStore = defineStore('doctor', {

    state: () => {
      return {
      name: "",
      surname: "",
      username:"" ,
      email :"" ,
      phone :0,
      age : 0,
      height :0 ,
      city :"",
      weight :0 ,
      gender : 0,
      country : ""
      };
    },

    getters: {
      patientDetail: (state) => {

        const decrypted = AES.decrypt(encrypted, 'MYKEY4DEMO');
        const decryptedText = decrypted.toString(enc.Utf8);
        return decryptedText;

      },
    },

    actions: {
      async fetchPatient() {
            const response = await axios.get(baseURL + '/doctor/me' , { withCredentials : true })

            const encrypted = AES.encrypt(response.data,'MYKEY4DEMO').toString();

            nuxtStorage.sessionStorage.setData('D12C', encrypted);
         
      }


    },

  })