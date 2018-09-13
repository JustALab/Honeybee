import { SET_CAKES_LIST } from "../Actions";

export default (state = null, action) => {
  switch (action.type) {
    case SET_CAKES_LIST:
      return action.cakesList;
    default:
      return state;
  }
};
