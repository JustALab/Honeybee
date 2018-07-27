import { SplashView } from './Views/SplashView';
import { CakesView } from './Views/CakesView';
import { createSwitchNavigator } from 'react-navigation';
import { ShopView } from './Views/ShopView';
import { CartView } from './Views/CartView';
import { OrdersView } from './Views/OrdersView';
import { ProfileView } from './Views/ProfileView';
import { LoginView } from './Views/LoginView';
import { Login } from './Views/Login';

export default Routes = createSwitchNavigator({
  splash: {
    screen: SplashView,
  },
  login: {
    screen: Login
  },
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
}, {
    initialRouteName: 'splash',
    headerMode: 'none'
  });
