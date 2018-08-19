import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import { secondary, secondaryDark, secondaryLight } from "../Config/Colors";
import {
  STRINGS,
  VERIFIED,
  VIEW_LOGIN,
  SUCCESS,
  MOBILE_NUMBER_EXISTS
} from "../Config/Strings";
import ApiService from "../Services/ApiService";
import { DBService } from "../Services/DBService";
import * as Actions from "../Actions";

const MAX_LENGTH_CODE = 4;
const MAX_LENGTH_MOBILE = 10;

class MobileVerificationView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enterCode: true,
      spinner: false,
      textValue: ""
    };
    this.handleResendVerificationCode = this.handleResendVerificationCode.bind(
      this
    );
    this.handleVerificationResponse = this.handleVerificationResponse.bind(
      this
    );
    this.handleUpdateMobileNumberResponse = this.handleUpdateMobileNumberResponse.bind(
      this
    );
    this.getSubmitAction = this.getSubmitAction.bind(this);
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

  handleUpdateMobileNumber() {
    console.log("Update mobile number invoked.");
    if (this.props.isNetworkConnected) {
      this.setState({ spinner: true }, () => {
        const customerData = {
          customerId: this.props.customerId,
          mobile: this.state.textValue
        };
        ApiService.updateMobileOnSignUp(customerData, res => {
          this.handleUpdateMobileNumberResponse(res);
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

  async handleUpdateMobileNumberResponse(res) {
    console.log("handleUpdateMobileNumberResponse method called.");
    this.setState({ spinner: false }, () => {
      setTimeout(() => {
        if (res === SUCCESS) {
          Alert.alert(
            STRINGS.msgMobileNumberUpdatedTitle,
            STRINGS.msgMobileNumberUpdatedContent
          );
          DBService.updateMobileNumber(this.state.textValue);
          let updatedUserRegistrationData = this.props.userData;
          updatedUserRegistrationData.mobile = this.state.textValue;
          this.props.setUserRegistrationData(updatedUserRegistrationData);
          this.setState({ enterCode: true, textValue: "" });
        } else if (res === MOBILE_NUMBER_EXISTS) {
          Alert.alert(
            STRINGS.msgMobileNumberAlreadyExistsTitle,
            STRINGS.msgMobileNumberAlreadyExistsTryAgainContent
          );
        }
      }, 100);
    });
  }

  handleVerifyMobileNumber() {
    console.log("Verify mobile number invoked.");
    if (this.props.isNetworkConnected) {
      if (this.state.textValue.length === MAX_LENGTH_CODE) {
        const { userData } = this.props;
        this.setState({ spinner: true }, () => {
          ApiService.verifyMobileNumber(
            {
              mobile: userData.mobile,
              otp: this.state.textValue
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
      }, 100)
    );
  }

  getSubmitAction() {
    this.state.enterCode
      ? this.handleVerifyMobileNumber()
      : this.handleUpdateMobileNumber();
  }

  renderUpdateMobile() {
    if (this.state.enterCode) {
      return (
        <View>
          <TouchableOpacity
            onPress={() => {
              console.log("Update mobile number pressed.");
              this.setState({ enterCode: false, textValue: "" });
            }}
          >
            <Text style={styles.updateNumber}>Wanna change mobile number?</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return <View />;
  }

  renderFooter() {
    if (this.state.enterCode) {
      return (
        <View>
          <TouchableOpacity onPress={this.handleResendVerificationCode}>
            <Text style={styles.footer}>Resend verification code</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.setState({ enterCode: true, textValue: "" })}
        >
          <Text style={styles.footer}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    console.log(this.state);
    console.log(this.props);
    let headerText = this.state.enterCode
      ? "Verification code sent to: " + this.props.userData.mobile
      : "What's your mobile number?";
    let buttonText = this.state.enterCode ? "Verify" : "Send Code";
    let textStyle = this.state.enterCode
      ? {
          height: 50,
          textAlign: "center",
          fontSize: 40,
          fontWeight: "bold",
          fontFamily: "Courier"
        }
      : {
          height: 30,
          textAlign: "center",
          fontSize: 20,
          fontWeight: "bold",
          fontFamily: "Courier"
        };
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Text style={styles.header}>{headerText}</Text>

        {this.renderUpdateMobile()}

        <View style={styles.form}>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              type={"TextInput"}
              underlineColorAndroid={"transparent"}
              autoCapitalize={"none"}
              autoCorrect={false}
              onChangeText={value => this.setState({ textValue: value })}
              placeholder={this.state.enterCode ? "_ _ _ _" : "Mobile number"}
              keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
              style={[styles.textInput, textStyle]}
              returnKeyType="go"
              autoFocus
              placeholderTextColor={secondary}
              selectionColor={secondary}
              maxLength={
                this.state.enterCode ? MAX_LENGTH_CODE : MAX_LENGTH_MOBILE
              }
              value={this.state.textValue}
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={this.getSubmitAction}
          >
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>

          {this.renderFooter()}
        </View>

        <Spinner visible={this.state.spinner} textStyle={{ color: "#fff" }} />
      </KeyboardAvoidingView>
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

export default connect(
  mapStateToProps,
  Actions
)(MobileVerificationView);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 15,
    color: "#4A4A4A"
  },
  form: {
    margin: 5
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
    marginTop: 30,
    fontSize: 14,
    textAlign: "center"
  },
  updateNumber: {
    marginTop: 5,
    fontSize: 14,
    textAlign: "center"
  }
});
