import { SplashView } from "./Views/SplashView";
import { createSwitchNavigator } from "react-navigation";
import { Login } from "./Views/Login";
import { MainView } from "./Views/MainView";

export default (Routes = createSwitchNavigator(
  {
    splash: {
      screen: SplashView
    },
    login: {
      screen: Login
    },
    mainView: {
      screen: MainView
    }
  },
  {
    initialRouteName: "splash",
    headerMode: "none"
  }
));
