<template>
    <section  class="typebento-box">
      <div  class="content-wrapper1 d-flex justify-content-center">
        <div  class="copy-component">
          <div   class="heading-text m-auto m-lg-0">
            <h1  class="heading21">Medical Evaluation from the Experts.</h1>
            <h3 class="subheading">Just one step closer to the right decision</h3>
          </div>
          <button class="cta-button m-auto m-lg-0">
            <div class="text-container">
              <a href="/doctor/register" style="text-decoration: none;"><b class="cta">Sign Now</b></a>
            </div>
          </button> 
        </div>
        <div class="media-layouts d-flex justify-content-center ">
          <img
            class="image-lummi d-none d-sm-flex"
            alt=""
            src="/home/doctor_photo4.jpg"
          />
          <div class="secondary-images  d-none d-sm-flex">
            <img
              class="image-lummi1 "
              alt=""  
              src="/home/doctor_photo1.jpg"
            />
            <img
              class="image-lummi2 "
              alt=""
              src="/home/doctor_photo3.jpg"
            />
          </div>
          <img
            class="image-lummi3" 
            alt=""
            src="/home/doctor_photo2.jpg"
          />
        </div>
      </div>
    </section>
  </template>
  <script setup>
  </script>
  <style scoped>
    .heading21 {
      margin: 0;
      align-self: stretch;
      position: relative;
      font-size: inherit;
      letter-spacing: -0.02em;
      line-height: 104%;
      font-weight: 700;
      font-family: inherit;
      display: -webkit-inline-box;
      
      
    }
    .subheading {
      margin: 0;
      align-self: stretch;
      position: relative;
      font-size: 1.5rem;
      line-height: 1.813rem;
      font-weight: 400;
      font-family: inherit;
      color: #059669;
    }
    .heading-text {
      align-self: stretch;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      gap: 1rem;
    }
    .cta {
      width: 9.125rem;
      position: relative;
      font-size: 1.125rem;
      line-height: 140%;
      display: flex;
      font-family: "DM Sans";
      color: #ecfdf5;
      text-align: center;
      align-items: center;
      justify-content: center;
    }
    .text-container {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding: 0rem 0.188rem;
    }
    .cta-button {
      cursor: pointer;
      border: none;
      padding: 1rem 1.25rem;
      background-color: #34d399;
      width: 100%;
      border-radius: 8px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      max-width: 22.5rem;
    }
    .copy-component {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      padding: 1.25rem 0rem;
      box-sizing: border-box;
      gap: 2.5rem;
      min-width: 19rem;
      max-width: 45rem;
    }
    .image-lummi {
      height: 24.5rem;
      width: 20rem;
      position: relative;
      border-radius: 32px;
      max-width: 100%;
      overflow: hidden;
      object-fit: cover;
      min-width: 20rem;
      min-height: 20rem;
    }
    .image-lummi1 {
      height: 11.5rem;
      width: 16.5rem;
      position: relative;
      border-radius: 32px;
      max-width: 100%;
      overflow: hidden;
      object-fit: cover;
      min-width: 11.25rem;
    }
    .image-lummi2 {
      height: 11.5rem;
      width: 16.5rem;
      position: relative;
      border-radius: 32px;
      max-width: 100%;
      overflow: hidden;
      object-fit: cover;
      min-width: 11.25rem;
    }
    .secondary-images {
      height: 24.5rem;
      width: 16.5rem;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 1.5rem;
      min-width: 15rem;
    }
    .image-lummi3 {
      height: 24.5rem;
      width: 38rem;
      position: relative;
      border-radius: 32px;
      max-width: 100%;
      overflow: hidden;
      object-fit: cover;
      min-width: 11.25rem;
    }
    .media-layouts {
      width: 38rem;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 1.5rem 1.375rem;
      min-width: 19rem;
      min-height: 50.5rem;
      max-width: 100%;
    }
    .content-wrapper1 {
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-start;
      padding: 0rem 0.125rem 0rem 0rem;
      box-sizing: border-box;
      gap: 2rem 1.875rem;
      max-width: 102.5rem;
    }
    .typebento-box {
      align-self: stretch;
      background-color: #ecfdf5;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      padding: 5rem 1rem;
      box-sizing: border-box;
      min-height: 62.5rem;
      max-width: 100%;
      text-align: left;
      font-size: 4.188rem;
      color: #064e3b;
      font-family: "DM Sans";
    }
  
    @media screen and (max-width: 1050px) {
      .heading21 {
        font-size: 3.375rem;
        line-height: 3.5rem;
      }
  
      .typebento-box {
        box-sizing: border-box;
        min-height:40rem
      }

      .media-layouts {
      min-height: 20rem;
        
    }
    }
    @media screen and (max-width: 750px) {
      .copy-component {
        gap: 1.25rem 2.5rem;
        max-width: 100%;
      }
      

      .typebento-box {
        padding-top: 2.125rem;
        padding-bottom: 2.125rem;
        box-sizing: border-box;
      }
    }
    @media screen and (max-width: 450px) {
      .heading21 {
        font-size: 2.5rem;
        line-height: 2.625rem;
      }
  
      .subheading {
        font-size: 1.125rem;
        line-height: 1.438rem;
      }
    }
  </style>
  