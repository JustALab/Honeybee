import { SplashView } from "./src/Views/SplashView";
import { createSwitchNavigator } from "react-navigation";
import { Login } from "./src/Views/Login";
import { MainView } from "./src/Views/MainView";

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
