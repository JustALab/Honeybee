import { SET_USER_REGISTRATION_DATA } from "../Actions";

export default (state = null, action) => {
  switch (action.type) {
    case SET_USER_REGISTRATION_DATA:
      return action.userData;
    default:
      return state;
  }
};
