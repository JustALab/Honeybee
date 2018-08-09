import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { Image } from "react-native";
import { Container } from "native-base";
import { DBService } from "../Services/DBService";
import * as Actions from "../Actions/Actions";
import { connect } from "react-redux";

class SplashView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    DBService.initDB();
    // DBService.unsetLoggedInStatus();
    DBService.getTokenIfUserAvailable((token, isLoggedIn) => {
      console.log("Logged in status: " + isLoggedIn);
      console.log("Token from DB: " + token);
      this.setTokenToState();
      if (token != null && isLoggedIn === 1) {
        setTimeout(() => {
          this.props.navigation.navigate("mainView");
        }, 2000);
      } else {
        setTimeout(() => {
          this.props.navigation.navigate("login");
        }, 2000);
      }
    });
  }

  setTokenToState() {
    console.log('Setting auth token to redux state.');
    this.props.setAuthToken(token);
  }

  render() {
    console.log(this.props);
    return (
      <Container style={styles.container}>
        <View>
          <StatusBar hidden={true} />
          <Image
            style={styles.image}
            resizeMode={"contain"}
            source={require("./images/hc_logo.png")}
          />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    height: 300,
    width: 300
  }
});

export default connect(
  null,
  Actions
)(SplashView);
