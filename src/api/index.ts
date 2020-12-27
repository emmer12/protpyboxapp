import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const mode = 'production'
let prod= 'https://proptybox.com.ng/api/v1' 
let production= 'https://proptybox.com/api/v1' 
// 
const api = axios.create({
  baseURL:production
});


// api.interceptors.request.use(function(config){
//   const tokens = AsyncStorage.getItem('token').then((token)=>{
//     if (token) {
//       config.headers.Authorization=`Bearer ${token}`
//     } else{
//       config.headers.Authorization=null
//     }

//   })
//    return config;
  
// })


api.interceptors.response.use((response) =>{
  return response;
}, (error) => {
  const originalRequest = error.config;
  if (!error.response) {
     return Promise.reject('Network Error')
  }
  else if ((error.response.status === 401) && !originalRequest._retry) {
      originalRequest._retry = true;
      return AsyncStorage.getItem('token')
          .then(token => {
              api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
              originalRequest.headers['Authorization'] = 'Bearer ' + token;
              return axios(originalRequest);
          })
          .catch(err => err)
  } else {
      return error.response
  }

})


export default api;