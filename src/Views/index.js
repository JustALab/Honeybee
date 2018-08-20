import React from "react";
import { NetInfo, Alert } from "react-native";
import SplashView from "./SplashView";
import { createSwitchNavigator } from "react-navigation";
import LoginNavigator from "../Navigators/LoginNavigator";
import MainNavigator from "../Navigators/MainNavigator";
import { connect } from "react-redux";
import * as Actions from "../Actions";
import { STRINGS } from "../Config/Strings";

class AppMain extends React.Component {
  constructor(props) {
    super(props);
    this.handleConnectionChange = this.handleConnectionChange.bind(this);
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleConnectionChange
    );

    NetInfo.isConnected.fetch().done(isConnected => {
      this.props.setNetworkConnStatus(isConnected);
    });
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleConnectionChange
    );
  }

  handleConnectionChange(isConnected) {
    this.props.setNetworkConnStatus(isConnected);
    console.log("Props @ Views - index- handleCOnnectionChange: ");
    console.log(this.props);
    if (!this.props.isNetworkConnected) {
      Alert.alert(
        STRINGS.msgNoConnectivityTitle,
        STRINGS.msgNoConnectivityContent
      );
    }
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
    login: LoginNavigator,
    mainView: MainNavigator
  },
  {
    initialRouteName: "splash",
    headerMode: "none"
  }
);

const mapStateToProps = state => {
  return {
    isNetworkConnected: state.isNetworkConnected
  };
};

export default connect(
  mapStateToProps,
  Actions
)(AppMain);
