import { SET_NETWORK_CONN_STATUS } from "../Actions";

export default (state = false, action) => {
  switch (action.type) {
    case SET_NETWORK_CONN_STATUS:
      return action.isNetworkConnected;
    default:
      return state;
  }
};
