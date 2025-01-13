import axios from 'axios'

let url = null;

export default defineEventHandler(async (event) => {
  try {
    const formDataEntries = await readMultipartFormData(event);

    const config = useRuntimeConfig(event);
    url = config.baseUrl;


    const formData = new FormData();


    formDataEntries.forEach((entry) => {
      const { name, data, filename, type } = entry;

      if (filename) {
        formData.append(name, new Blob([data], { type }), filename);
      } else {

        formData.append(name, data);
      }

    });

    console.log(`${config.baseUrl}/api/users/doctor/register`);

    const response = await axios.post(`${config.baseUrl}/api/users/doctor/register`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })

    console.log(response.data)

    if (response.status == 201) {
      return response.data;
    }
    else {
      return { success: false }
    }

  } catch (error) {
    console.log(error.response.data)


    return { success: false, message: error.response.data }
  }

})

