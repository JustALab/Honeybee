import React from "react";
import { BackHandler } from "react-native";
import { Provider } from "react-redux";
import { createStore } from "redux";
import MainReducer from "./src/Reducers";
import AppMain from "./src/Views";
import { Root } from "native-base";

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
    return (
      <Provider store={createStore(MainReducer)}>
        <Root>
          <AppMain />
        </Root>
      </Provider>
    );
  }
}
