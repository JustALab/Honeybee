import { SET_CUSTOMER_ID } from "../Actions";

export default (state = null, action) => {
  switch (action.type) {
    case SET_CUSTOMER_ID:
      return action.customerId;
    default:
      return state;
  }
};
