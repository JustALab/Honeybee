import React from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  Alert
} from "react-native";
import { connect } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import Form from "react-native-form";
import { secondary, secondaryDark } from "../Config/Colors";

const MAX_LENGTH_CODE = 6;

class MobileVerificationView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false
    };
  }

  handleResendVerificationCode() {}

  renderFooter() {
    return (
      <View>
        <Text style={styles.wrongNumberText} onPress={this._tryAgain}>
          Resend verification code
        </Text>
      </View>
    );
  }

  render() {
    let headerText = "Verify OTP";
    let buttonText = "Verify";
    return (
      <View style={styles.container}>
        <Text style={styles.header}>{headerText}</Text>

        <Form ref={"form"} style={styles.form}>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              ref={"textInput"}
              name={"code"}
              type={"TextInput"}
              underlineColorAndroid={"transparent"}
              autoCapitalize={"none"}
              autoCorrect={false}
              onChangeText={this._onChangeText}
              placeholder={"_ _ _ _ _ _"}
              keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
              style={[styles.textInput, styles.textStyle]}
              returnKeyType="go"
              autoFocus
              placeholderTextColor={secondaryDark}
              selectionColor={secondary}
              maxLength={MAX_LENGTH_CODE}
              onSubmitEditing={this._getSubmitAction}
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={this._getSubmitAction}
          >
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>

          {this.renderFooter()}
        </Form>

        <Spinner
          visible={this.state.spinner}
          textContent={"One moment..."}
          textStyle={{ color: "#fff" }}
        />
      </View>
    );
  }
}

export const mapStateToProps = state => {
  return {
    isNetworkConnected: state.isNetworkConnected
  };
};

export default connect(mapStateToProps)(MobileVerificationView);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    textAlign: "center",
    marginTop: 60,
    fontSize: 22,
    margin: 20,
    color: "#4A4A4A"
  },
  form: {
    margin: 20
  },
  textInput: {
    padding: 0,
    margin: 0,
    flex: 1,
    fontSize: 20,
    color: secondaryDark
  },
  button: {
    marginTop: 20,
    height: 50,
    backgroundColor: secondary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Helvetica",
    fontSize: 16,
    fontWeight: "bold"
  },
  wrongNumberText: {
    margin: 10,
    fontSize: 14,
    textAlign: "center"
  },
  disclaimerText: {
    marginTop: 30,
    fontSize: 12,
    color: "grey"
  },
  callingCodeView: {
    alignItems: "center",
    justifyContent: "center"
  },
  callingCodeText: {
    fontSize: 20,
    color: secondary,
    fontFamily: "Helvetica",
    fontWeight: "bold",
    paddingRight: 10
  },
  textStyle: {
    height: 50,
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
    fontFamily: "Courier"
  }
});
