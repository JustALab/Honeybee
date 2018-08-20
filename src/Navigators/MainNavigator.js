import { createSwitchNavigator } from "react-navigation";
import { CakesView } from "../Views/CakesView";
import { ShopView } from "../Views/ShopView";
import { CartView } from "../Views/CartView";
import { OrdersView } from "../Views/OrdersView";
import ProfileView from "../Views/ProfileView";

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
      screen: ProfileView
    }
  },
  {
    initialRouteName: "cakes",
    headerMode: "none"
  }
);
