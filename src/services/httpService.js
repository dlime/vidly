import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// axios.defaults.headers.common["access-control-expose-headers"] = "x-auth-token";

function setJsonWebToken(jsonWebToken) {
  // Included in every http request, header will not be set when user is not logged in
  axios.instance.defaults.headers.common["x-auth-token"] = jsonWebToken;
}

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    toast.error("Unexpected error " + (error.response && error.response.data));
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
