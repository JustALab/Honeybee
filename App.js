import React from 'react';
import { BackHandler } from "react-native";
import { SplashView } from "./src/Views/SplashView";
import { createSwitchNavigator } from "react-navigation";
import { Login } from "./src/Views/Login";
import { MainView } from "./src/Views/MainView";

export default class App extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton() {
    console.log("Back button is pressed");
    return true;
  }

  render() {
    return <AppRoutes />;
  }
}

const AppRoutes = createSwitchNavigator(
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
);
