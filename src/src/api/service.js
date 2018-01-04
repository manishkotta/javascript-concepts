require('es6-promise').polyfill();
var axios = require('axios');
import { browserHistory } from 'react-router';

import * as authMan from "../authentication/auth-manager";

axios.interceptors.request.use(
  (config) => {
    if (config.__isRetryRequest)
      console.log("This is a retry")
    const authToken = authMan.getAuthToken();
    if (authToken) {
      config.headers = Object.assign({}, config.headers, {
        Authorization: `bearer ${authToken}`
      });
    } else {
      browserHistory.push('/login')
    }
    return config;
  },
  (error) => {
    console.log('request error', error)
    return Promise.reject(error);
  });

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (err.response.status === 401) {
      authMan.clearAuth();
      browserHistory.push('/login');
      // alert("Not authorized");
    }
    return Promise.reject(err);
  });

export function axiosPost(url, data, config) {
  return (
    axios.post(url, data)
  )
}

export function axiosGet(url, queryString = null) {
  var getUrl = url;
  if (queryString) {
    getUrl = getUrl + "?" + queryString;
  }
  return (
    axios.get(getUrl)
    .catch(function (error) {
      console.log(error, 'error axios get');
    })
  )
}
