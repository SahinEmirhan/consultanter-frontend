<template>

    <div class="container">
        <div class="row">
            <div class="col-5 mx-auto">
                <div class="card mt-5" style="background-color: #DAFBEB;">
                    <div class="row p-3 d-flex justify-content-center" >

                        <p class="text-end">1 Ticket = {{ price }} $</p>

                        <div class="form-group col-6 col-lg-10 my-3">
                            <label for="exampleFormControlInput1">Name on card</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1">
                        </div>

                        <div class="form-group col-6 col-lg-10 my-3">
                            <label for="exampleFormControlInput1">Credit Card Number</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1">
                        </div>

                        <div class="form-group col-6 col-lg-3 mt-3">
                            <label for="exampleFormControlInput1">Expiration</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1">
                        </div>

                        <div class="form-group col-6 col-lg-3 mt-3">
                            <label for="exampleFormControlInput1">CVV</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1">
                        </div>

                        <div class="form-group col-6 col-lg-4 mt-3">
                            <label for="exampleFormControlInput1">Ticket Size</label>
                            <input v-model="tickets" type="text" class="form-control" id="exampleFormControlInput1">
                        </div>


                        <div class="col-6 col-lg-10 d-flex justify-content-end mt-1">
                            <span class="">Total Price: {{ tickets * price }} $</span>
                        </div>

                        <div class="col-10 d-flex ">
                            <button @click="onSubmit" class="btn btn-success col-8 mx-auto mt-4">Continue to checkout</button>
                        </div>



                    </div>
                </div>
            </div>
        </div>
        <AlertComponent :msg="errMessage" :status="errStatus" :headMsg ="headMsg" v-if="alertVisible" />
    </div>
    </template>

    <script setup>
    import axios from 'axios'

    let price = ref(182);
    let tickets = ref(0);

    let alertVisible = ref(false)
    let errMessage = ref('')
    let errStatus = ref('')
    let headMsg = ref('')
    let showAlertComponent = (msg , head ,status) => {
        alertVisible.value = true
        errMessage.value = msg
        errStatus.value = status 
        headMsg.value = head
        setTimeout( async ()=> {
            alertVisible.value = false
        } , 4000)
    }


    const onSubmit = async () => {
        try{

            console.log(price)
            console.log(tickets)

            let response = await axios.post('/api/payment/pay',  {tickets: tickets.value})

            console.log(response)
            if(response.data.success == true)
            {
                showAlertComponent('Tickets Successfully bought.' , 'Success' , true )
                setTimeout(()=> {
                    return navigateTo('/patient' ,{external : true})
                } , 2000)
                

            }
            else {
                showAlertComponent('Tickets Unsuccessfully bought.' , 'Error' , false )
                setTimeout(()=> {} , 2000)
                console.log('false')


            }
            } catch(err)
            {
                showAlertComponent('Please Restart Client Fast' , 'Fatal Error ' , false )
                setTimeout(()=> {} , 2000)
                console.log(err)
                console.log('istek gönderilirken hata oluştu!')


            }
        }











    definePageMeta
    ({
      middleware
    : [
        'auth-patient',
      ],
    });

    </script>
