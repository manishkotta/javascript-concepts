import Constants from "../constants/apiUrl";
import * as service from "./service";
import * as authMan from "../authentication/auth-manager";
import 'url-search-params-polyfill';

export function userLogin(loginDetails) {
  let params = new URLSearchParams();
  params.append('userName', loginDetails.userName);
  params.append('password', loginDetails.password);
  params.append('grant_type', 'password');
  return service.axiosPost(Constants.AUTH_TOKEN, params);
}
export function userLogout() {
  var authDetails = authMan.getAuth();
  authMan.clearAuth();
  return service.axiosGet(`${Constants.LOGOUT_URL}/${authDetails.Nic}/1`);
}

export function refreshToken(refresh_token) {
  let params = new URLSearchParams();
  var authDetails = authMan.getAuth();
  params.append('refresh_token', refresh_token);
  params.append('grant_type', 'refresh_token');
  params.append('Nic', authDetails.Nic);

  let config = {
    // __isRetryRequest: true
  }
  service.axiosPost(Constants.AUTH_TOKEN, params, config)
    .then(res => {
      authMan.setAuth(res ? res.data : {});
      console.log(res, "TOKEN REFRESH DONE");
      authMan.triggerRefreshToken();
    });
  // return service.axiosPost(Constants.AUTH_TOKEN, params, config);
}

