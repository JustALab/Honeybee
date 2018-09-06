import { createStackNavigator } from "react-navigation";
import CakesView from "../Views/CakesView";
import DeliveryDetailsView from "../Views/DeliveryDetailsView";
import { STRINGS } from "../Config/Strings";
import { SECONDARYDark, ON_PRIMARY } from "../Config/Colors";

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
      headerTintColor: SECONDARYDark,
      headerTitleStyle: {
        alignItems: "center",
        color: ON_PRIMARY
      },
      headerBackTitle: null
    }
  }
);
