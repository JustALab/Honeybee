import { SET_CUSTOMER_DATA } from "../Actions";

export default (state = null, action) => {
  switch (action.type) {
    case SET_CUSTOMER_DATA:
      return action.customerData;
    default:
      return state;
  }
};
