import axios from "axios";
import {
  host,
  authUrl,
  customerUrl,
  signUpCustomer,
  verifyMobileNumber
} from "../Config/Server";

export default (ApiService = {
  login: (loginCredentials, callback) => {
    axios
      .post(host + authUrl, loginCredentials)
      .then(res => {
        callback(res.data.token);
      })
      .catch(err => {
        callback(null);
      });
  },

  buildAuthHeader: token => {
    return {
      Authorization: "Bearer " + token
    };
  },

  signUpCustomer: (customerData, callback) => {
    axios
      .post(host + signUpCustomer, customerData)
      .then(res => {
        callback(res.data);
      })
      .catch(err => {
        callback(null);
      });
  },

  getCustomerData: (token, callback) => {
    axios
      .get(host + customerUrl, { headers: ApiService.buildAuthHeader(token) })
      .then(res => {
        console.log("Fetching customer data success");
        callback(res.data);
      })
      .catch(err => {
        console.log("Fetching customer data failure");
        callback(null);
      });
  },

  verifyMobileNumber: (userData, callback) => {
    axios
      .put(host + verifyMobileNumber, userData)
      .then(res => {
        callback(res.data);
        console.log("Mobile number verification success.");
      })
      .catch(err => {
        callback(null);
        console.log("Mobile number verification failure. " + err.message);
      });
  }
});
