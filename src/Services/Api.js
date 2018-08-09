import axios from "axios";
import { host, authUrl, customerUrl } from "../Config/Server";

export default (Api = {

  login: (payload, callback) => {
    axios
      .post(host + authUrl, payload)
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

  getCustomerData: (token, callback) => {
    axios
      .get(host + customerUrl, { headers: Api.buildAuthHeader(token) })
      .then(res => {
        console.log("Fetching customer data success");
        callback(res.data);
      })
      .catch(err => {
        console.log("Fetching customer data failure");
        callback(null);
      });
  }
});
