import { createStackNavigator } from "react-navigation";
import CakesView from "../Views/CakesView";
import DeliveryDetailsView from "../Views/DeliveryDetailsView";
import { STRINGS } from "../Config/Strings";
import { secondaryDark, onPrimary } from "../Config/Colors";

export default createStackNavigator(
  {
    cakesMain: {
      screen: CakesView,
      navigationOptions: {
        header: null
      }
    },
    deliveryDetails: {
      screen: DeliveryDetailsView,
      navigationOptions: {
        title: STRINGS.deliveryDetails
      }
    }
  },
  {
    initialRouteName: "cakesMain",
    navigationOptions: {
      headerTintColor: secondaryDark,
      headerTitleStyle: {
        alignItems: "center",
        color: onPrimary
      },
      headerBackTitle: null
    }
  }
);
