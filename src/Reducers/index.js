import { combineReducers } from "redux";
import ProfileReducer from "./ProfileReducer";
import AuthReducer from "./AuthReducer";
import NetworkReducer from "./NetworkReducer";
import UserRegistrationReducer from "./UserRegistrationReducer";
import CustomerIdReducer from "./CustomerIdReducer";
import CustomerDataReducer from "./CustomerDataReducer";
import DeliveryDetailsReducer from "./DeliveryDetailsReducer";
import LocationsListReducer from "./LocationsListReducer";

export default combineReducers({
  isNetworkConnected: NetworkReducer,
  authToken: AuthReducer,
  profile: ProfileReducer,
  userRegistrationData: UserRegistrationReducer,
  customerId: CustomerIdReducer,
  customerData: CustomerDataReducer,
  deliveryDetails: DeliveryDetailsReducer,
  locationsList: LocationsListReducer
});
