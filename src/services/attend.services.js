
import httpService from './http.services';
import { errorCatcher } from './errors';


const GetAttendData = () => httpService
  .get(`/mod/tsugi-react-base/api/getrows.php`)
  .then(({ data }) => data)
  .catch((err) => {
    errorCatcher(err.response.data);
    return Promise.reject(err.response.data);
  });



const GetInstructorData = () => httpService
.get(`/api/settings.php`)
.then(({ data }) => data)
.catch((err) => {
  console.log(err);
  errorCatcher(err.response.data);
  return Promise.reject(err.response.data);
});

const UpdateSettings = (data) => httpService
.post(`/api/settings.php`,data)
.then(({ data }) => data)
.catch((err) => {
  //errorCatcher(err.response.data);
  // Promise.reject(err.response.data);
});

const RecordAttendance = (data) => httpService
.post(`/mod/tsugi-react-base/api/attend.php`,data)
.then(({ data }) => {
  data; 
  if(data.status == 'success'){
    alert("Success!");
  } else {
    alert("Something was wrong");
  }
})
.catch((err) => {
  errorCatcher(err.response.data);
   Promise.reject(err.response.data);
});

const ClearData = () => httpService
.post(`/mod/tsugi-react-base/api/getrows.php`)
.then(({ data }) => data)
.catch((err) => {
  // errorCatcher(err.response.data);
  // return Promise.reject(err.response.data);
});

export default {GetAttendData,UpdateSettings,RecordAttendance,GetInstructorData,ClearData};
