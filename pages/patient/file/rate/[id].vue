<template>
    <div class="container">
      <div class="row">
        <div class="col-6 mx-auto">
          <div class="card mt-5 p-3" style="background-color: #DAFBEB;">
            <h5 class="card-title text-center">Rate and Comment</h5>
            <div class="card-body">
              <div class="mb-3 text-center">
                <div>
                  <svg
                    v-for="star in 5"
                    :key="star"
                    @click="setRating(star)"
                    @mouseover="hoverRating = star"
                    @mouseleave="hoverRating = rating"
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    style="cursor: pointer; margin-right: 5px;"
                    :class="star <= (hoverRating || rating) ? 'text-warning' : 'text-secondary'"
                  >
                    <path
                      d="M2.866 14.85c-.078.444.36.791.746.593l4.388-2.256 4.389 2.256c.396.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.32.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.63-.283.95l3.523 3.356-.83 4.73z"
                    />
                  </svg>
                </div>
              </div>
              <div class="mb-3">
                <label for="comment" class="form-label">Comment</label>
                <textarea
                  id="comment"
                  class="form-control"
                  rows="3"
                  v-model="comment"
                  placeholder="Write your comment here..."
                ></textarea>
              </div>
              <button class="btn btn-success w-100" @click="submitRateAndComment">Send Rate And Comment</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import { useRoute } from 'vue-router';

  export default {
    data() {
      return {
        rating: 0, 
        hoverRating: 0, 
        comment: "", 
        id: null
      };
    },
    created() {
    const route = useRoute();
    this.id = route.params.id;
 },

    methods: {
      setRating(star) {
        this.rating = star;
      },
      async submitRateAndComment() {
        if (!this.rating) {
          alert("Please select a rating.");
          return;
        }
        if (!this.comment.trim()) {
          alert("Please enter a comment.");
          return;
        }

        let response  = await axios.post('/api/patient/caseReview', {rating: this.rating, comment: this.comment, id: this.id }, {withCredentials:true})
        console.log(this.rating)
        navigateTo(`/patient/file/${this.id}`)
        // Bağlama Muhabbetleri burada yapılacak.
      },
    },
  };
  </script>
  
  <style>
  .text-warning {
    color: #ffc107; /* Gold */
  }
  
  .text-muted {
    color: #e4e5e9; /* Light Gray */
  }
  </style>
  