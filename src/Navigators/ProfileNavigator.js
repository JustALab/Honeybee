import { createStackNavigator } from "react-navigation";
import ProfileView from "../Views/ProfileView";
import { PrivacyPolicyView } from "../Views/PrivacyPolicyView";
import { TermsConditions } from "../Views/TermsConditions";
import { STRINGS } from "../Config/Strings";
import commonStyles from "../Commons/Styles";
import { SECONDARYDark } from "../Config/Colors";

export default createStackNavigator(
  {
    profileView: {
      screen: ProfileView,
      navigationOptions: {
        header: null
      }
    },
    profileTerms: {
      screen: TermsConditions,
      navigationOptions: {
        title: STRINGS.termsConditions,
        headerTitleStyle: commonStyles.headerNavigatorTitle
      }
    },
    profilePrivacyPolicy: {
      screen: PrivacyPolicyView,
      navigationOptions: {
        title: STRINGS.privacyPolicy,
        headerTitleStyle: commonStyles.headerNavigatorTitle
      }
    }
  },
  {
    initialRouteName: "profileView",
    navigationOptions: {
      headerTintColor: SECONDARYDark,
      headerTitleStyle: {
        alignItems: "center"
      }
    }
  }
);
