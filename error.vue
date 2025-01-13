<template>
    
<div class='row'>
    
    <img class="err-img mx-auto d-block" src="/404.png">

    <button @click="navigateTo('/')" class="col-6 col-lg-4 m-auto btn btn-success mt-3 position-absolute err-btn" style=" left: 50%; transform: translateX(-50%); color:#DAFBEB; background-color:#19E399; border:none; ;"  type="button" >Go To Home Page</button>

</div>



</template>


 
<style>
.err-img {
    width:40%
}
.err-btn{
    bottom: calc(10%);
}
@media only screen and (max-width: 750px) {
  .err-img{
    width:100%
    }
    .err-btn{
    bottom:calc(35%)
  }
}
 
  @media only screen and (min-width: 750px) and (max-width:1050px) {
  .err-img{
    width:100%
  }
}
  @media only screen and (min-width: 750px) and (max-width:1050px) {
  .err-btn{
    bottom:calc(20%)
  }
  
}



</style>