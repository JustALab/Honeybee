export const SET_TOKEN = "SET_TOKEN";
export const SET_NETWORK_CONN_STATUS = "SET_NETWORK_CONN_STATUS";
export const SET_USER_REGISTRATION_DATA = "SET_USER_REGISTRATION_DATA";
export const SET_CUSTOMER_ID = "SET_CUSTOMER_ID";
export const SET_CUSTOMER_DATA = "SET_CUSTOMER_DATA";

export const setAuthToken = token => {
  return {
    type: SET_TOKEN,
    token
  };
};

export const setNetworkConnStatus = isNetworkConnected => {
  return {
    type: SET_NETWORK_CONN_STATUS,
    isNetworkConnected
  };
};

export const setUserRegistrationData = userData => {
  return {
    type: SET_USER_REGISTRATION_DATA,
    userData
  };
};

export const setCustomerId = customerId => {
  return {
    type: SET_CUSTOMER_ID,
    customerId
  };
};

export const setCustomerData = customerData => {
  return {
    type: SET_CUSTOMER_DATA,
    customerData
  };
};
