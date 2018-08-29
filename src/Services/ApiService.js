import axios from "axios";
import {
  HOST,
  URL_AUTH,
  URL_CUSTOMER,
  URL_SIGNUP_CUSTOMER,
  URL_VERIFY_MOBILE_NUMBER,
  URL_RESEND_VERIFICATION_CODE,
  URL_UPDATE_MOBILE_ON_SIGNUP,
  URL_DELETE_CUST_ADDR,
  URL_CHANGE_PASSWORD
} from "../Config/Server";
import { INCORRECT_OLD_PASSWORD, SUCCESS } from "../Config/Strings";

export default (ApiService = {
  login: (loginCredentials, callback) => {
    axios
      .post(HOST + URL_AUTH, loginCredentials)
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
      .post(HOST + URL_SIGNUP_CUSTOMER, customerData)
      .then(res => {
        callback(res.data);
      })
      .catch(err => {
        callback(null);
      });
  },

  getCustomerData: (token, callback) => {
    axios
      .get(HOST + URL_CUSTOMER, { headers: ApiService.buildAuthHeader(token) })
      .then(res => {
        console.log("Fetching customer data success");
        callback(res.data);
      })
      .catch(err => {
        console.log("Fetching customer data failure: " + err.message);
        callback(null);
      });
  },

  verifyMobileNumber: (userData, callback) => {
    console.log("To verify: " + JSON.stringify(userData));
    axios
      .put(HOST + URL_VERIFY_MOBILE_NUMBER, userData)
      .then(res => {
        callback(res.data);
        console.log("Mobile number verification: " + res.data);
      })
      .catch(err => {
        callback(null);
        console.log("Mobile number verification failure. " + err.message);
      });
  },

  resendVerificationCode: (customerId, callback) => {
    axios
      .post(HOST + URL_RESEND_VERIFICATION_CODE + customerId)
      .then(res => {
        callback(res.data);
        console.log("Re-send verification code triggered.");
      })
      .catch(err => {
        callback(null);
        console.log("Re-sending verification code error: " + err.message);
      });
  },

  updateMobileOnSignUp: (custMobileData, callback) => {
    axios
      .put(HOST + URL_UPDATE_MOBILE_ON_SIGNUP, custMobileData)
      .then(res => {
        callback(res.data);
        console.log(custMobileData);
        console.log(HOST + URL_UPDATE_MOBILE_ON_SIGNUP);
        console.log("Update mobile on signup success.");
      })
      .catch(err => {
        console.log("Update mobile on signup error: " + err.message);
        callback(null);
      });
  },

  deleteCustomerAddress: (token, addressId) => {
    axios
      .delete(HOST + URL_DELETE_CUST_ADDR + addressId, {
        headers: ApiService.buildAuthHeader(token)
      })
      .then(() => console.log("Successfully deleted customer address/"))
      .catch(err =>
        console.log("Error deleting customer address: " + err.message)
      );
  },

  changePassword: (oldPassword, newPassword, token, callback) => {
    axios
      .put(
        HOST + URL_CHANGE_PASSWORD,
        {
          oldPassword,
          newPassword
        },
        {
          headers: ApiService.buildAuthHeader(token)
        }
      )
      .then(res => {
        console.log("change password successfully.");
        callback(res.data);
      })
      .catch(err => {
        console.log("change password failure:" + err.message);
        callback(null);
      });
  }
});
