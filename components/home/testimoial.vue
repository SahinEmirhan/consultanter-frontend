<template>
    <div class="testimonial">
      <img
        class="avatar-lummiavatars-icon"
        loading="lazy"
        alt=""
        :src="avatarLummiavatars"
      />
      <b class="name">{{name1}}</b>
      <div class="short-testimonial">{{shortTestimonial}}</div>
    </div>
  </template>
  <script setup> 
      const props = ['avatarLummiavatars' , 'name1' , 'shortTestimonial' ]
  </script>
  <style scoped>
    .avatar-lummiavatars-icon {
      width: 7.5rem;
      height: 7.5rem;
      position: relative;
      border-radius: 48px;
      object-fit: cover;
    }
    .name {
      align-self: stretch;
      position: relative;
      line-height: 150%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .short-testimonial {
      align-self: stretch;
      position: relative;
      line-height: 150%;
    }
    .testimonial {
      height: 16.438rem;
      flex: 1;
      border-radius: 32px;
      background-color: #dcfce7;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      box-sizing: border-box;
      gap: 1rem;
      min-width: 16.5rem;
      max-width: 22.5rem;
      text-align: center;
      font-size: 0.875rem;
      color: #064e3b;
      font-family: "DM Sans";
    }
  </style>
  