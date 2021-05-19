// import axios from "axios";
import axiosServices from "./axiosServices";
let Config = require("../Configuration/Configuration");
const axiosService = new axiosServices();

export default class userServices {
  SignUp(data) {
    let url = Config.SignUp;
    return axiosService.post(url, data, false);
  }

  SignInEmail(data) {
    let url = Config.SignInEmail;
    return axiosService.post(url, data, false);
  }

  SignInPassword(data) {
    let url = Config.SignInPassword;
    return axiosService.post(url, data, false);
  }

  ConversionService(data) {
    let url = Config.ConversionService;
    return axiosService.post(url, data, false);
  }

  ConversionHistory() {
    let url = Config.ConversionHistory;
    return axiosService.get(url, false);
  }
}
