import { SET_LOCATIONS_LIST } from "../Actions";

export default (state = null, action) => {
  switch (action.type) {
    case SET_LOCATIONS_LIST:
      return action.locationsList;
    default:
      return state;
  }
};
