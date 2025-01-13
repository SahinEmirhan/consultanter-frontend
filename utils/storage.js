import axios from 'axios'
import nuxtStorage from 'nuxt-storage';
import {AES, enc} from 'crypto-js';
const baseURL = 'http://localhost:3000'

const storageDoctor = {
    fetchDoctor: async() => {
        try{
            
        if(process.server) return
        const response = await axios.get(baseURL + '/doctor/me' , { withCredentials : true })


        const encrypted = AES.encrypt(JSON.stringify(response.data),'MYKEY4DEMO').toString();

        nuxtStorage.localStorage.setData('D12C', encrypted);

        } catch(err)
        {
            console.log(err)
        }
    },

    getDoctor: () => {
        const doctor = nuxtStorage.localStorage.getData('D12C');

        if(doctor)
        {
        return JSON.parse(AES.decrypt(doctor , 'MYKEY4DEMO').toString(enc.Utf8));
        }

        return null;
    }
}


export {
    storageDoctor
}