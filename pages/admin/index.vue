<template>
   <div class="container py-5">
     <div class="row">
       <!-- Doctor Approve Card -->
       <a class="col-12 col-md-6 col-lg-4 my-3 mx-auto" href="/admin/doctorApprove" style="text-decoration: none;">
         <div class="card shadow-lg rounded-4" style="background-color: #34D399;">
           <div class="d-flex justify-content-center align-items-center h-100 p-4">
             <h2 class="text-light fw-bold">Doctor Approve</h2>
           </div>
         </div>
       </a>
       
       <!-- Department Card -->
       <a class="col-12 col-md-6 col-lg-4 my-3 mx-auto" href="/admin/department" style="text-decoration: none;">
         <div class="card shadow-lg rounded-4" style="background-color: #34D399;">
           <div class="d-flex justify-content-center align-items-center h-100 p-4">
             <h2 class="text-light fw-bold">Department</h2>
           </div>
         </div>
       </a>
 
       <!-- Complaint Card -->
       <a class="col-12 col-md-6 col-lg-4 my-3 mx-auto" href="/admin/complaint" style="text-decoration: none;">
         <div class="card shadow-lg rounded-4" style="background-color: #34D399;">
           <div class="d-flex justify-content-center align-items-center h-100 p-4">
             <h2 class="text-light fw-bold">Complaint</h2>
           </div>
         </div>
       </a>
     </div>
   </div>
 </template>
 
 <style scoped>
   .card {
     height: 12rem;
     transition: transform 0.3s ease, box-shadow 0.3s ease;
   }
 
   .card:hover {
     transform: translateY(-5px);
     box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
   }
 
   .fw-bold {
     font-weight: 700;
   }
 
   /* Responsive Design Adjustments */
   @media (max-width: 576px) {
     .card {
       height: 10rem;
     }
   }
 
   /* Mobile Adjustments */
   @media (max-width: 768px) {
     .card {
       height: 11rem;
     }
   }
 </style>
 
  
  <script setup>
  
  definePageMeta
  ({
    middleware
  : [
      'auth-admin',
    ],
  });
  
  </script>