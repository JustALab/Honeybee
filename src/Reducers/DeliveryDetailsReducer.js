import { SET_DELIVERY_DETAILS } from "../Actions";

let deliveryDetails = {
  deliveryDate: "",
  deliveryTime: "ASAP",
  deliveryLocation: "",
  deliveryAddressType: "",
  deliveryAddress: "Choose your location...",
  deliveryVendorId: 0
};

export default (state = deliveryDetails, action) => {
  switch (action.type) {
    case SET_DELIVERY_DETAILS:
      return action.deliveryDetails;
    default:
      return state;
  }
};
