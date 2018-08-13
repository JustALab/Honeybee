import { combineReducers } from "redux";
import ProfileReducer from "./ProfileReducer";
import AuthReducer from "./AuthReducer";
import NetworkReducer from "./NetworkReducer";
import UserRegistrationReducer from "./UserRegistrationReducer";

export default combineReducers({
  isNetworkConnected: NetworkReducer,
  authToken: AuthReducer,
  profile: ProfileReducer,
  userRegistrationData: UserRegistrationReducer
});
