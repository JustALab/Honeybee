import { createSwitchNavigator } from "react-navigation";
import { ShopView } from "../Views/ShopView";
import { CartView } from "../Views/CartView";
import { OrdersView } from "../Views/OrdersView";
import ProfileNavigator from "../Navigators/ProfileNavigator";
import CakesNavigator from "../Navigators/CakesNavigator";

export default createSwitchNavigator(
  {
    cakes: {
      screen: CakesNavigator
    },
    shop: {
      screen: ShopView
    },
    cart: {
      screen: CartView
    },
    orders: {
      screen: OrdersView
    },
    profile: {
      screen: ProfileNavigator
    }
  },
  {
    initialRouteName: "cakes",
    headerMode: "none"
  }
);
