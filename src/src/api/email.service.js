import Constants from "../constants/apiUrl"
import axios from 'axios'


export function getUsers() {
  return axios({
    method: 'get',
    url: Constants.USEREMAIL,
  })
}



export function postUsers(saveData) {
  console.log("fdsf", saveData);
  return axios({
    method: 'post',
    url: Constants.USEREMAIL,
    data: saveData,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }

  })
}