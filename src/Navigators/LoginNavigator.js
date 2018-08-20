import { createStackNavigator } from "react-navigation";
import LoginView from "../Views/LoginView";
import RegisterView from "../Views/RegisterView";
import { PrivacyPolicyView } from "../Views/PrivacyPolicyView";
import { TermsConditions } from "../Views/TermsConditions";
import { STRINGS } from "../Config/Strings";
import { secondaryDark } from "../Config/Colors";
import MainNavigator from "./MainNavigator";
import MobileVerificationView from "../Views/MobileVerificationView";

export default createStackNavigator(
  {
    login: {
      screen: LoginView,
      navigationOptions: {
        header: null
      }
    },
    register: {
      screen: RegisterView,
      navigationOptions: {
        title: STRINGS.register
      }
    },
    privacy: {
      screen: PrivacyPolicyView,
      navigationOptions: {
        title: STRINGS.privacyPolicy
      }
    },
    terms: {
      screen: TermsConditions,
      navigationOptions: {
        title: STRINGS.termsConditions
      }
    },
    mobileVerification: {
      screen: MobileVerificationView,
      navigationOptions: {
        title: STRINGS.mobileVerification,
        headerLeft: null
      }
    },
    mainView: {
      screen: MainNavigator,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "login",
    navigationOptions: {
      headerTintColor: secondaryDark,
      headerTitleStyle: {
        color: secondaryDark,
        alignItems: "center"
      }
    }
  }
);
