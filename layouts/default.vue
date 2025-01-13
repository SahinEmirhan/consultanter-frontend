<template>
  <div :key="layoutKey">

<!-- Login Register navbar
<div class="row navbar text-light mt-1 me-3 ms-3 p-0 align-items center ">
      <div class="col-3 m-0 navbar-text d-none d-sm-block" >
          <div class="row ps-3">
            <div class="col-4">
            <span >Home</span>
          </div>
        </div>
        
      </div>

      <div class="col-sm-6 col-4 m-0">
        <div class="row text-center navbar-text m-0 p-0 justify-content-center align-items-center">
          <div class="col-2 text-center p-0 d-flex align-items-center justify-content-center">
                <img class="p-0 m-0" style="height:4rem; width:auto; max-height:52px;" src="../public/logo.png"/>
                <span style="font-size:14px;">Consultanter</span>
            </div>
            
          
        </div>
        
      </div>

      <div class="col-3 m-0 pe-3 navbar-text d-none d-sm-block ">
        <div class="row justify-content-end">
          <div class="col-xl-4 ">
              <div class="row pe-3 text-center justify-content-end">
                <span class="col-4 col-lg-3 col-xl-6">Login</span>
                <span class="col-4 col-lg-3 col-xl-6">Register</span>

              </div>
              
          
        </div>
       
        </div>

      </div>
      <div class="col-4 text-end d-block d-sm-none">
        
    <button class="navbar-toggler" style="border:0px solid" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
      
    <span class="navbar-toggler-icon" style="color: white;"></span>
    </button>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
        </ul>
        <form class="d-flex mt-3" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </div>
    
</div>
-->
<div class="row me-3 justify-content-center">

  <div class="col-xl-1 col-lg-3  col-md-3 col-sm-3 col-xs-4 col-5 d-flex justify-content-end pe-lg-5">
    
  <nuxt-link to="/"><img class=" mt-1" src="/logo.png" width="128px" height="128px" alt=""></nuxt-link>
    
  </div>
<div  :class="isMenuOpened ? 'non-border-bottom-rad' : 'border-rad'" class="navbar text-light p-0 align-items-center col-xl-9 col-lg-9  col-md-9 col-sm-9 col-xs-9 col-7" style="border-top-left-radius:0px; border-bottom-left-radius:0px; margin-top:18px;">


    
      <div class="col-6 m-0 navbar-text d-none d-sm-block" >
              <div class="row">
                <div class="col-xl-9">
                  <div class="row text-center ">
                    <nuxt-link to="/" class="col-3  m-0 p-0" style="text-decoration:none; color:#D1FAE5;">Home</nuxt-link>
                    <nuxt-link v-if="userType" @click="navigateTo(`/${userType}` , {external : true})" class="col-3  m-0 p-0" style="text-decoration:none; color:#D1FAE5; cursor:pointer">Profile</nuxt-link>
                    <nuxt-link v-if="userType == 'PATIENT'" :to="`/patient/createReport`" class="col-3 m-0 p-0" style="text-decoration:none; color:#D1FAE5">Report</nuxt-link>
                    <nuxt-link v-if="userType == 'DOCTOR'" :to="`/doctor/websocket`" class="col-3  m-0 p-0" style="text-decoration:none; color:#D1FAE5">File Store</nuxt-link>
                    <nuxt-link v-if="userType == 'DOCTOR' && doctorType != 2" :to="`/doctor/reviewWebSocket`" class="col-3  m-0 p-0" style="text-decoration:none; color:#D1FAE5">Review Files</nuxt-link>
                    <nuxt-link v-if="userType == 'ADMIN'" :to="`/admin/nurse`" class="col-4  m-0 p-0" style="text-decoration:none; color:#D1FAE5">Nurse</nuxt-link>
                    <nuxt-link v-if="!userType" to="/about-us" class="col-4  m-0 p-0" style="text-decoration:none;color:#D1FAE5">About</nuxt-link>
                  </div>
                 
                </div>
                
              </div>  
      </div>
     

      <div class="col-6 m-0  navbar-text d-none d-sm-block ">
        <div class="row justify-content-end">
          <div  class="col-xl-6 ">
              <div class="row text-center justify-content-end me-2">
                <a href="/patient/payment" v-if="userType == 'PATIENT'" class="col-4 m-0 p-0" style="text-decoration:none;color:#D1FAE5">Buy Ticket</a>
                <a href="/" v-if="userType" @click="logout()" class="col-4  m-0 p-0" style="text-decoration:none;color:#D1FAE5">Logout</a>
               
                
                <nuxt-link to="/join-us" v-if="!userType" class="col-4 m-0 p-0" style="text-decoration:none;color:#D1FAE5">Join Us</nuxt-link>
                <nuxt-link v-if="!userType" to="/login"  class="col-4  m-0 p-0" style="text-decoration:none;color:#D1FAE5">Login</nuxt-link>
                <nuxt-link v-if="!userType" class="col-4  m-0 p-0" to="/patient/register" type="button" style="text-decoration:none;color:#D1FAE5" >Register</nuxt-link> 
                
             
               
                
              </div>
          </div>

        
       
        </div>

      </div>
       
      <!-- Login Register Mobil Menu
      <div class="col-4 text-end d-block d-sm-none">
      -->


      <div class="col-6 m-0  ps-3 navbar-text d-block d-sm-none my-1" >
              <div class="row">
                <nuxt-link to="/" class="col-md-2 col-lg-1 col-xs-2 col-2" style="text-decoration:none; color:#D1FAE5">Home</nuxt-link>
              </div>  
      </div>


  <div class="col-6 pe-2 text-end d-block d-sm-none my-1">
      


    
    <button @click="isMenuOpened = !isMenuOpened" class="navbar-toggler btn" style="border:none; " type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
      <img width="32" height="32" src="/hamburger_menu.png" alt="menu-squared-2"/>
    </button>

  </div>

  
  <div class="collapse" style=" width:100%; z-index: 1000; " id="navbarToggleExternalContent" >
      <div class="p-4 d-flex justify-content-center border-0" style="background-color:rgba(6,78,59,0.8);  border-bottom-left-radius:8px; border-bottom-right-radius:8px;">
        <div v-if="!userType" class="row d-flex justify-content-center text-center" style="border-radius:32px;">
          
          
          <h5 class="text-white h4 mb-3"><a style="text-decoration:none;" class="text-light" href="/join-us">Join Us</a></h5>
          <hr>
          <h5  class="text-white h4 mb-3"><a style="text-decoration:none;" class="text-light" href="/about-us">About Us</a></h5>
          <hr>
          <h5 class="text-white h4 mb-3"><a style="text-decoration:none;" class="text-light" href="/login">Login</a></h5>
          <hr>
          <h5 class="text-white h4 "><a style="text-decoration:none;" class="text-light" href="/patient/register">Register</a></h5>
        </div>
        
        <div v-if="userType" class="row d-flex justify-content-center text-center" >
          
          <h5  class="text-white h4 mb-3"><a style="text-decoration:none;" class="text-light" :href="`/${userType}`">Profile</a></h5>
          <hr>
          <h5  class="text-white h4 mb-3"><a style="text-decoration:none;" class="text-light" href="/about-us">About Us</a></h5>
          <hr>
          <h5 @click="logout" class="text-white h4"><a style="text-decoration:none;" class="text-light" href="/">Logout</a></h5>
          
          
        </div>
        
        
      </div>
  </div>
  </div> 
    
</div>

<slot/>

 <section class="row footer typewith-newsletter mx-0" style="background-color:#064e3b; ">
      <div class="col-12 row ">
        <div class=" col-6 col-lg-3  m-0 p-0 mb-5">
          <h3 class="list-heading my-1">About Us</h3>
          <div class="list-link-item my-1"><a class="dropdown-item" href="/about-us#our-vision">Our Vision</a></div>
          <div class="list-link-item1  my-1"><a class="dropdown-item" href="/about-us#our-mission">Our Mission</a></div>
          <div class="list-link-item2  my-1"><a class="dropdown-item" href="/about-us">About</a></div>
        </div>
        <div class=" col-6 col-lg-3  m-0 p-0">
          <h3 class="list-heading1  my-1">Our Services</h3>
          <div class="list-link-item3 my-1"><a class="dropdown-item" href="/under-construction">Blog</a></div>
          <div class="list-link-item4 my-1"><a class="dropdown-item" href="/under-construction">Health Plans</a></div>
        </div>
        <div class=" col-6 col-lg-3  m-0 p-0">
          <h3 class="list-heading2 my-1">Company</h3>
          <div class="list-link-item6 my-1"><a class="dropdown-item" href="/under-construction">Privacy Policy</a></div>
          <div class="list-link-item7 my-1"><a class="dropdown-item" href="/under-construction">Terms Of Service</a></div>
        </div>
        <div class="row col-6 col-lg-3 m-0 p-0">
          <div class="col-12 label-and-description p-0 m-0">
            <h3 class="list-heading3">Consultanter</h3>
            <div class="list-description">
              Contact us for detailed information and questions.
            </div>
          </div>
          <div class="col-12 input-with-button my-2 p-0 d-none d-sm-flex">
            <div class="input">
              <div class="input-form">
                <div class="text-container">
                  <div class="placeholder-text">info@consultanter.net</div>
                </div>
              </div>
            </div>
            <button class="button">
              <img class="icon1" alt="" src="/send.png" />
            </button>
          </div>
          <div class="links d-none d-sm-flex">
            <div class="list-link-item9"><a class="dropdown-item" href="/under-construction">Legal Info</a></div>
          </div>
        </div>
        <div class="col-12 input-with-button my-2 mt-3 p-0 d-flex d-sm-none">
            <div class="input">
              <div class="input-form">
                <div class="text-container">
                  <div class="placeholder-text">info@consultanter.net</div>
                </div>
              </div>
            </div>
            <button class="button">
              <img class="icon1" alt="" src="/send.png" />
            </button>
          </div>
          <div class="links d-flex d-sm-none">
            <div class="list-link-item9"><a class="dropdown-item" href="/under-construction">Legal Info</a></div>
          </div>
      </div>
    </section>

  </div>

</template>

<script setup>
let isMenuOpened = ref(false)
let userType = ref('')
let token = ref('')
let doctorType = ref('')
userType = useCookie('userType')
token = useCookie('JSESSIONID')
doctorType = useCookie('doctorType')

const layoutKey = ref(0);

// Sayfa değiştiğinde key değerini artırarak navbar'ın yeniden render edilmesini sağlarız
watch(() => useRoute(), () => {
  layoutKey.value += 1;
});
const logout = () => {
  console.log("logging out..")
  useCookie('JSESSIONID').name = null
  useCookie('userType').name = null
  useCookie('JSESSIONID').value = null
  useCookie('userType').value = null
}
</script>


<style scoped>

a:hover{
  color: #eafcf6 !important;
}

button:focus {
  outline:none;
  box-shadow: none;
}
.navbar-light .navbar-toggler-icon {
     background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(0, 0, 0, 0.5)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}
.navbar {
  background-color : #064E3B;
  height : 55px;
  max-height: 100%;
  max-width: 100%;
  
}


.navbar-text{
  font-size:16px; 
  font-weight:bold; 
  color: #D1FAE5;
}

.border-rad{
  border-radius : 64px;
}

.non-border-bottom-rad{
  border-top-right-radius:0px;
  border-bottom-right-radius:0px;
}

.list-heading {
      margin: 0;
      position: relative;
      font-size: 1.125rem;
      line-height: 140%;
      font-weight: 700;
      font-family: inherit;
      color: #5ec590;
    }
    .list-link-item {
      position: relative;
      line-height: 150%;
      display: inline-block;
      min-width: 4.25rem;
    }
    .list-link-item1 {
      position: relative;
      line-height: 150%;
    }
    .list-link-item2 {
      position: relative;
      line-height: 150%;
    }
    .list {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      padding: 0rem 10.313rem 0rem 0rem;
      box-sizing: border-box;
      gap: 1rem;
      min-width: 6.75rem;
    }
    .list-heading1 {
      margin: 0;
      position: relative;
      font-size: 1.125rem;
      line-height: 140%;
      font-weight: 700;
      font-family: inherit;
      color: #5ec590;
      white-space: nowrap;
    }
    .list-link-item3 {
      position: relative;
      line-height: 150%;
      display: inline-block;
      min-width: 3.875rem;
    }
    .list-link-item4 {
      position: relative;
      line-height: 150%;
    }
    .list-link-item5 {
      position: relative;
      line-height: 150%;
      display: inline-block;
      min-width: 4.875rem;
    }
    .list1 {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      padding: 0rem 9.313rem 0rem 0rem;
      box-sizing: border-box;
      gap: 1rem;
      min-width: 6.75rem;
    }
    .list-heading2 {
      margin: 0;
      position: relative;
      font-size: 1.125rem;
      line-height: 140%;
      font-weight: 700;
      font-family: inherit;
      color: #5ec590;
      display: inline-block;
      min-width: 4.75rem;
    }
    .list-link-item6 {
      position: relative;
      line-height: 150%;
    }
    .list-link-item7 {
      position: relative;
      line-height: 150%;
    }
    .list-link-item8 {
      position: relative;
      line-height: 150%;
    }
    .list2 {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      padding: 0rem 9.313rem 0rem 0rem;
      box-sizing: border-box;
      gap: 1rem;
      min-width: 6.75rem;
    }
    .list-heading3 {
      margin: 0;
      align-self: stretch;
      position: relative;
      font-size: inherit;
      line-height: 140%;
      font-weight: 700;
      font-family: inherit;
    }
    .list-description {
      align-self: stretch;
      position: relative;
      font-size: 1rem;
      line-height: 150%;
      color: #02b079;
    }
    .label-and-description {
      align-self: stretch;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 0.5rem;
      color: #5ec590;
    }
    .placeholder-text {
      flex: 1;
      position: relative;
      line-height: 150%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .text-container {
      flex: 1;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      padding: 0rem 0.563rem 0rem 0.25rem;
    }
    .input-form {
      align-self: stretch;
      border-radius: 8px 0px 0px 8px;
      background-color: #ecfdf5;
      border: 1px solid #a7f3d0;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      padding: 1rem 0.938rem;
    }
    .input {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
    }
    .icon1 {
      height: 1.5rem;
      width: 1.5rem;
      position: relative;
    }
    .button {
      cursor: pointer;
      border: none;
      padding: 0.906rem;
      background-color: #34d399;
      align-self: stretch;
      border-radius: 0px 8px 8px 0px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
    .input-with-button {
      align-self: stretch;
      height: 3.313rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      font-size: 0.875rem;
    }
 .list-link-item9 {
   position: relative;
   line-height: 160%;
   display: inline-block;
   min-width: 3.313rem;
 }
 .list-link-item10 {
   position: relative;
   line-height: 160%;
   display: inline-block;
   min-width: 4.813rem;
 }
 .links {
   display: flex;
   flex-direction: row;
   align-items: flex-start;
   justify-content: flex-start;
   gap: 1rem;
   font-size: 0.75rem;
 }
 .list3 {
   width: 18.5rem;
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   justify-content: flex-start;
   gap: 1rem;
   min-width: 6.75rem;
   font-size: 1.125rem;
 }
 .content {
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
   align-items: flex-start;
   justify-content: flex-start;
   padding: 0rem 0.25rem 0rem 0rem;
   box-sizing: border-box;
   gap: 2.5rem 2.419rem;
   min-width: 17.5rem;
   max-width: 75rem;
 }
 .typewith-newsletter {
   align-self: stretch;
   background-color: #ecfdf5;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: flex-start;
   padding: 4rem 1.25rem 0.438rem;
   text-align: left;
   font-size: 1rem;
   color: #02b079;
      font-family: "DM Sans";
    }
    .footer{
      margin-top:15%;
    }
    @media screen and (min-height: 1000px) {
      .footer {
        margin-top: 40%;
      }
    }


    @media screen and (max-width: 1200px) {
      .content {
        max-width: 100%;
      }
    }
    @media screen and (max-width: 750px) {
      .content {
        gap: 2.5rem 1.188rem;
      }
  
      .typewith-newsletter {
        gap: 1rem 2rem;
      }
    }
    @media screen and (max-width: 450px) {
      .list {
        padding-right: 1.25rem;
        box-sizing: border-box;
      }
  
      .list1 {
        padding-right: 1.25rem;
        box-sizing: border-box;
      }
  
      .list2 {
        padding-right: 1.25rem;
        box-sizing: border-box;
      }
    }

</style>