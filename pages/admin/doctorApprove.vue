<template>
  <div v-if="pending">
    <p>Loading...</p>
  </div>
  <div v-else id="app" class="container mt-5">
    <div class="row">
      <div class="col-12 col-md-8 m-auto mb-3">
        <div class="row d-flex justify-content-center">
          <div class="col-8 col-sm-8 col-xl-11 p-0">
            <input
              style="
                border-top-right-radius: 0px;
                border-bottom-right-radius: 0px;
              "
              v-model="searchTerm"
              type="text"
              class="form-control"
              placeholder="Search..."
            />
          </div>
          <div class="col-3 col-sm-2 col-xl-1 p-0">
            <button
              style="
                border-top-left-radius: 0px;
                border-bottom-left-radius: 0px;
              "
              class="btn btn-success w-100"
              @click="search"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Surname</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            <tr
              scope="row"
              v-for="item in doctor"
              :key="item.id"
              @click="goToPage(item.id)"
            >
              <td
                class="clickable"
                @click="
                  searchTerm = item.id;
                  search();
                "
              >
                {{ item.id }}
              </td>
              <td>{{ item.name }}</td>
              <td>{{ item.surname }}</td>
              <td>{{ item.email }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        v-if="searchResult"
        class="card p-5 my-5 col-12"
        style="background-color: #dafbeb"
      >
        <div
          type="button"
          class="close"
          style="position: absolute; right: 1%; top: -1%; font-size: 2rem"
          @click="searchResult = {}"
        >
          &times;
        </div>
        <div class="row d-flex">
          <div
            class="col-12 col-sm-6 col-lg-4 col-xl-3"
            v-for="(value, key) in searchResult"
            :key="key"
          >
            <div
              v-if="
                key == 'profilePhoto' ||
                key == 'certificatePhoto' ||
                key == 'taxPlate' ||
                key == 'degreePhoto'
              "
              class="card border-light mb-3 text-center m-auto"
              style="max-width: 20rem"
            >
              <div class="card-header">{{ key }}</div>
              <div class="card-body">
                <NuxtImg
                  class="border border-1 border-success"
                  :src="'data:image/jpeg;base64,' + value"
                  style="width: 190px; height: 170px; border-radius: 8px"
                  alt="Photo"
                />
              </div>
            </div>
            <div
              v-else
              class="card border-light mb-3 text-center m-auto"
              style="max-width: 20rem"
            >
              <div class="card-header">{{ key }}</div>
              <div class="card-body">
                <h6 class="card-title">{{ value }}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12">
        <div class="card p-3 mt-5" style="background-color: #dafbeb">
          <h1 class="text-center mb-5">Approve Doctor</h1>
          <form class="row">
            <div class="form-group col-6 my-3">
              <label for="exampleFormControlInput1">Doctor Id</label>
              <input
                v-model="doctorId"
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
              />
            </div>
            <div class="form-group col-6 my-3">
              <label for="exampleFormControlInput1">Specialization</label>
              <select
                v-model="specialization"
                class="form-select"
                aria-label="Default select example"
              >
                <option disabled>Select Specilization</option>
                <option v-for="d in department" :value="d.name">
                  {{ d.name }}
                </option>
              </select>
            </div>

            <div class="form-group col-6 my-3">
              <label for="exampleFormControlInput1">Doctor Type</label>
              <select
                v-model="doctorType"
                class="form-select"
                aria-label="Default select example"
              >
                <option disabled>Select Doctor Type</option>
                <option value="2">Specialist Physician</option>
                <option value="1">Senior Specialist</option>
                <option value="3">Consultant Physician</option>
              </select>
            </div>

            <div class="col-12 d-flex justify-content-end mt-5">
              <button class="btn btn-success" @click="createProfile">
                Create Profile !
              </button>
            </div>
          </form>
        </div>

        {{ createProfileResult }}
      </div>
    </div>
    <AlertComponent
      :msg="errMessage"
      :status="errStatus"
      :headMsg="headMsg"
      v-if="alertVisible"
    />
  </div>
</template>

    <script setup>
import axios from "axios";

let {
  pending,
  data: doctor,
  status,
} = await useLazyFetch("/api/admin/doctorApprove");
let {
  pending2,
  data: department,
  status2,
} = await useLazyFetch("/api/admin/department");

let searchTerm = ref("");
let searchResult = ref({});

let search = async () => {
  try {
    let response = await useFetch(`/api/admin/doctor/${searchTerm.value}`, {
      withCredentials: true,
    });

    console.log(response.data.value);

    if (response.data.value) {
      let {
        name,
        surname,
        email,
        birthDate,
        city,
        country,
        gender,
        doctorType,
        specialization,
        profilePhoto,
        taxPlate,
        certificatePhoto,
        degreePhoto,
      } = response.data.value;
      searchResult.value.name = name;
      searchResult.value.surname = surname;
      searchResult.value.email = email;
      searchResult.value.birthDate = birthDate;
      searchResult.value.city = city;
      searchResult.value.country = country;
      searchResult.value.gender = gender;
      searchResult.value.doctorType = doctorType;
      searchResult.value.specialization = specialization;
      searchResult.value.profilePhoto = profilePhoto;
      searchResult.value.taxPlate = taxPlate;
      searchResult.value.certificatePhoto = certificatePhoto;
      searchResult.value.degreePhoto = degreePhoto;
    } else {
      showAlertComponent("Please enter a valid id.", "Invalid id", false);
    }
  } catch (error) {
    console.error(error);
  }
};

let doctorType = ref("");
let title = ref("");
let photo = ref("");
let specialization = ref("");
let doctorId = ref("");

let createProfileResult = ref("");

let createProfile = async (event) => {
  try {
    event.preventDefault();

    let specs = await axios.post("/api/admin/doctorApprove", {
      specialization: specialization.value,
      id: doctorId.value,
      doctorType: doctorType.value,
    });

    createProfileResult.value = specs.data.message;
  } catch (err) {
    console.log(err);
    createProfileResult.value = err;
  }
};

let alertVisible = ref(false);
let errMessage = ref("");
let errStatus = ref("");
let headMsg = ref("");
let showAlertComponent = (msg, head, status) => {
  alertVisible.value = true;
  errMessage.value = msg;
  errStatus.value = status;
  headMsg.value = head;
  setTimeout(async () => {
    alertVisible.value = false;
  }, 4000);
};

/*
definePageMeta
({
middleware
: [
  'auth-admin',
],
});
*/
</script>
  
  <style scoped>
.clickable:hover {
  cursor: pointer;
}
.table-responsive {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch; /* iOS cihazlarda yumuşak kaydırma */
}

.table {
  width: 100%;
  min-width: 600px; /* Minimum genişlik ayarlayabilirsiniz */
}

@media (max-width: 768px) {
  td {
    font-size: 13px;
  }
}
</style>