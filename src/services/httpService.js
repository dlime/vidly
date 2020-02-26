import axios from "axios";
import { toast } from "react-toastify";

function setJsonWebToken(jsonWebToken) {
  // Included in every http request, header will not be set when user is not logged in
  axios.defaults.headers.common["x-auth-token"] = jsonWebToken;
}

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("Logging unexpected error ", error);
    toast.error("Unexpected error");
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  delete: axios.delete,
  put: axios.put,
  setJsonWebToken
};
