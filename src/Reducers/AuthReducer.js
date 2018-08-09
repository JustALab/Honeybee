import { SET_TOKEN } from "../Actions/Actions";

export default (state = null, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return action.token;
    default:
      return state;
  }
};
