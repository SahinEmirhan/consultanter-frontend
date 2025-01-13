<template>
    <div class="landing-page">
      
      <HomeTypeBentoBox />
      <section  class="typebig-statement">
        <div data-aos="fade-up"
     data-aos-duration="2000" class="text-content">
          <h1 class="benefit-heading">Our Commitment</h1>
          <h1 class="heading">
            We facilitate affordable second opinions from globally renowned experts for your health decision-making process.
          </h1>
        </div>
      </section> 
      <HomeTypeMobileDevice /><HomeProperty1StepsGrid />
      <!--
      <HomeProperty1Cards />
      -->
    </div>
  </template>
  <script>
  </script>
  <style scoped>
    .benefit-heading {
      margin: 0;
      align-self: stretch;
      position: relative;
      font-size: inherit;
      line-height: 2.125rem;
      font-weight: 700;
      font-family: inherit;
    }
    .heading {
      margin: 0;
      align-self: stretch;
      position: relative;
      font-size: 3.188rem;
      letter-spacing: -0.02em;
      line-height: 120%;
      font-weight: 700;
      font-family: inherit;
      color: #064e3b;
    }
    .text-content {
      width: 64rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 0.5rem;
      max-width: 64rem;
    }
    .typebig-statement {
      align-self: stretch;
      background-color: #ecfdf5;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: center;
      padding: 9rem 1.25rem;
      box-sizing: border-box;
      max-width: 100%;
      text-align: left;
      font-size: 1.75rem;
      color: #65a30d;
      font-family: "DM Sans";
    }
    .landing-page {
      width: 100%;
      position: relative;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      letter-spacing: normal;
    }
  
    @media screen and (max-width: 1050px) {
      .heading {
        font-size: 2.563rem;
        line-height: 3.063rem;
      }
  
      .text-content {
        max-width: 100%;
      }
    }
    @media screen and (max-width: 750px) {
      .typebig-statement {
        gap: 3rem 1.5rem;
        padding-top: 5.875rem;
        padding-bottom: 5.875rem;
        box-sizing: border-box;
      }
    }
    @media screen and (max-width: 450px) {
      .benefit-heading {
        font-size: 1.375rem;
        line-height: 1.688rem;
      }
  
      .heading {
        font-size: 1.938rem;
        line-height: 2.313rem;
      }
    }
  </style>
  