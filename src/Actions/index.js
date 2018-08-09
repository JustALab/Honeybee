export const SET_TOKEN = "SET_TOKEN";
export const SET_NETWORK_CONN_STATUS = "SET_NETWORK_CONN_STATUS";

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
