import { createStackNavigator } from "react-navigation";
import LoginView from "../Views/LoginView";
import RegisterView from "../Views/RegisterView";
import { PrivacyPolicyView } from "../Views/PrivacyPolicyView";
import { TermsConditions } from "../Views/TermsConditions";
import { STRINGS } from "../Config/Strings";
import { secondaryDark } from "../Config/Colors";
import MainNavigator from "./MainNavigator";
import MobileVerificationView from "../Views/MobileVerificationView";
import commonStyles from "../Commons/Styles";

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
        title: STRINGS.register,
        headerTitleStyle: commonStyles.headerNavigatorTitle
      }
    },
    privacy: {
      screen: PrivacyPolicyView,
      navigationOptions: {
        title: STRINGS.privacyPolicy,
        headerTitleStyle: commonStyles.headerNavigatorTitle
      }
    },
    terms: {
      screen: TermsConditions,
      navigationOptions: {
        title: STRINGS.termsConditions,
        headerTitleStyle: commonStyles.headerNavigatorTitle
      }
    },
    mobileVerification: {
      screen: MobileVerificationView,
      navigationOptions: {
        title: STRINGS.mobileVerification,
        headerTitleStyle: commonStyles.headerNavigatorTitle
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
        alignItems: "center"
      },
      headerBackTitle: null
    }
  }
);
