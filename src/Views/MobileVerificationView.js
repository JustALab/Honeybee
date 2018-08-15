import React from "react";
import {
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
import { STRINGS, VERIFIED, VIEW_LOGIN } from "../Config/Strings";
import ApiService from "../Services/ApiService";
import { DBService } from "../Services/DBService";

const MAX_LENGTH_CODE = 4;

class MobileVerificationView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      code: "",
      mobile: ""
    };
    this.handleResendVerificationCode = this.handleResendVerificationCode.bind(
      this
    );
    this.handleVerificationResponse = this.handleVerificationResponse.bind(
      this
    );
    this.handleVerifyMobileNumber = this.handleVerifyMobileNumber.bind(this);
  }

  handleResendVerificationCode() {
    if (this.props.isNetworkConnected) {
      this.setState({ spinner: true }, () => {
        ApiService.resendVerificationCode(this.props.customerId, () => {
          this.setState({ spinner: false });
          console.log("Successfully OTP sent again.");
        });
      });
    } else {
      console.log("No internet connectivity.");
      Alert.alert(
        STRINGS.msgNoConnectivityTitle,
        STRINGS.msgNoConnectivityContent
      );
    }
  }

  // handleUpdateMobileNumber() {
  //   if (this.props.isNetworkConnected) {
  //     this.setState({ spinner: true }, () => {
  //       const customerData = {
  //         customerId: this.props.customerId,
  //         mobile: this.state.mobile
  //       };
  //       ApiService.updateMobileOnSignUp(customerData, () => {
  //         this.setState({ spinner: false });
  //       });
  //     });
  //   } else {
  //     console.log("No internet connectivity.");
  //     Alert.alert(
  //       STRINGS.msgNoConnectivityTitle,
  //       STRINGS.msgNoConnectivityContent
  //     );
  //   }
  // }

  handleVerifyMobileNumber() {
    if (this.props.isNetworkConnected) {
      if (this.state.code.length === MAX_LENGTH_CODE) {
        const { userData } = this.props;
        this.setState({ spinner: true }, () => {
          ApiService.verifyMobileNumber(
            {
              email: userData.email,
              mobile: userData.mobile,
              otp: this.state.code
            },
            res => this.handleVerificationResponse(res)
          );
        });
      }
    } else {
      console.log("No internet connectivity.");
      Alert.alert(
        STRINGS.msgNoConnectivityTitle,
        STRINGS.msgNoConnectivityContent
      );
    }
  }

  handleVerificationResponse(res) {
    console.log(res);
    console.log("STATE CALLBACK BEFORE");
    this.setState({ spinner: false }, () =>
      setTimeout(() => {
        if (res === VERIFIED) {
          console.log("STATE CALLBACK");
          DBService.updateMobileVerificationStaus(VERIFIED);
          Alert.alert(
            STRINGS.msgSuccessTitle,
            STRINGS.msgMobileVerificationSuccess,
            [
              {
                text: "OK",
                onPress: () => {
                  console.log(
                    "Success! OK pressed in success message. Moving to login screen."
                  );
                  this.props.navigation.navigate(VIEW_LOGIN);
                }
              }
            ]
          );
        } else {
          Alert.alert(
            STRINGS.msgErrorTitle,
            STRINGS.msgIncorrectVerificationCode
          );
        }
      }, 300)
    );
  }

  renderUpdateMobile() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            console.log("Update mobile number pressed.");
          }}
        >
          <Text style={styles.footer}>Entered a wrong mobile number?</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderFooter() {
    return (
      <View>
        <TouchableOpacity onPress={this.handleResendVerificationCode}>
          <Text style={styles.footer}>Resend verification code</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    console.log(this.state);
    console.log(this.props);
    let headerText =
      "Verification code sent to your mobile number. " +
      this.props.userData.mobile;
    let buttonText = "Verify";
    let textStyle = {
      height: 50,
      textAlign: "center",
      fontSize: 40,
      fontWeight: "bold",
      fontFamily: "Courier"
    };
    return (
      <View style={styles.container}>
        <Text style={styles.header}>{headerText}</Text>

        {this.renderUpdateMobile()}

        <Form ref={"form"} style={styles.form}>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              ref={"textInput"}
              name={"code"}
              type={"TextInput"}
              underlineColorAndroid={"transparent"}
              autoCapitalize={"none"}
              autoCorrect={false}
              onChangeText={value => this.setState({ code: value })}
              placeholder={"_ _ _ _"}
              keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
              style={[styles.textInput, textStyle]}
              returnKeyType="go"
              autoFocus
              placeholderTextColor={secondaryDark}
              selectionColor={secondary}
              maxLength={MAX_LENGTH_CODE}
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={this.handleVerifyMobileNumber}
          >
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>

          {this.renderFooter()}
        </Form>

        <Spinner visible={this.state.spinner} textStyle={{ color: "#fff" }} />
      </View>
    );
  }
}

export const mapStateToProps = state => {
  console.log(state);
  return {
    isNetworkConnected: state.isNetworkConnected,
    userData: state.userRegistrationData,
    customerId: state.customerId
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
    fontSize: 15,
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
  footer: {
    margin: 10,
    fontSize: 14,
    textAlign: "center"
  }
});
