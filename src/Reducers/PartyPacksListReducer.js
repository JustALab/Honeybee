import { SET_PARTY_PACKS_LIST } from "../Actions";

export default (state = null, action) => {
  switch (action.type) {
    case SET_PARTY_PACKS_LIST:
      return action.fancyItemsList;
    default:
      return state;
  }
};
