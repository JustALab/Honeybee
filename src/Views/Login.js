import React from "react";
import { createStackNavigator } from "react-navigation";
import LoginView from "./LoginView";
import { RegisterView } from "./RegisterView";
import { PrivacyPolicyView } from "./PrivacyPolicyView";
import { TermsConditions } from "./TermsConditions";
import { STRINGS } from "../Config/Strings";
import { onPrimary, secondary, secondaryDark } from "../Config/Colors";
import { MainView } from "../Views/MainView";

export class Login extends React.Component {
  componentWillMount() {
    console.disableYellowBox = true;
  }

  render() {
    return <LoginNavigator />;
  }
}

const LoginNavigator = createStackNavigator(
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
    mainView: {
      screen: MainView,
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
