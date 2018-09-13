export const SET_TOKEN = "SET_TOKEN";
export const SET_NETWORK_CONN_STATUS = "SET_NETWORK_CONN_STATUS";
export const SET_USER_REGISTRATION_DATA = "SET_USER_REGISTRATION_DATA";
export const SET_CUSTOMER_ID = "SET_CUSTOMER_ID";
export const SET_CUSTOMER_DATA = "SET_CUSTOMER_DATA";
export const SET_DELIVERY_DETAILS = "SET_DELIVERY_DETAILS";
export const SET_LOCATIONS_LIST = "SET_LOCATIONS_LIST";
export const SET_CAKES_LIST = "SET_CAKES_LIST";
export const SET_PARTY_PACKS_LIST = "SET_PARTY_PACKS_LIST";

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

export const setUserRegistrationData = userData => ({
  type: SET_USER_REGISTRATION_DATA,
  userData
});

export const setCustomerId = customerId => ({
  type: SET_CUSTOMER_ID,
  customerId
});

export const setCustomerData = customerData => ({
  type: SET_CUSTOMER_DATA,
  customerData
});

export const setLocationsList = locationsList => ({
  type: SET_LOCATIONS_LIST,
  locationsList
});

export const setDeliveryDetails = deliveryDetails => ({
  type: SET_DELIVERY_DETAILS,
  deliveryDetails
});

export const setCakesList = cakesList => ({
  type: SET_CAKES_LIST,
  cakesList
});

export const setPartyPacksList = fancyItemsList => ({
  type: SET_PARTY_PACKS_LIST,
  fancyItemsList
});
