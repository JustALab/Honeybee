import { createSwitchNavigator } from "react-navigation";
import { CakesView } from "../Views/CakesView";
import { ShopView } from "../Views/ShopView";
import { CartView } from "../Views/CartView";
import { OrdersView } from "../Views/OrdersView";
import ProfileNavigator from "../Navigators/ProfileNavigator";

export default createSwitchNavigator(
  {
    cakes: {
      screen: CakesView
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
