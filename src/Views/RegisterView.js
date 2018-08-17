import React from "react";
import { StyleSheet, View, Alert, Platform } from "react-native";
import {
  Container,
  Content,
  Form,
  Input,
  Item,
  Text,
  Button,
  Label
} from "native-base";
import { primary, secondary, onPrimary, secondaryDark } from "../Config/Colors";
import { DatePicker } from "../Components/Datepicker/Datepicker";
import { connect } from "react-redux";
import {
  STRINGS,
  SUCCESS,
  MOBILE_NUMBER_EXISTS,
  NOT_VERIFIED,
  VIEW_LOGIN,
  VIEW_MOBILE_VERIFICATION,
  MOBILE_LINKED_WITH_OTHER_EMAIL,
  EMAIL_LINKED_WITH_OTHER_MOBILE
} from "../Config/Strings";
import ApiService from "../Services/ApiService";
import { DBService } from "../Services/DBService";
import * as Actions from "../Actions";
import Spinner from "react-native-loading-spinner-overlay";

class RegisterView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      dob: "",
      email: "",
      mobile: "",
      password: "",
      emailVerificationStatus: "",
      mobileVerificationStatus: "",
      spinner: false
    };
    this.handleRegister = this.handleRegister.bind(this);
    this.handleRegisterResponse = this.handleRegisterResponse.bind(this);
  }

  handleRegister() {
    if (this.props.isNetworkConnected) {
      this.setState({ spinner: true });
      ApiService.signUpCustomer(this.state, res =>
        this.handleRegisterResponse(res)
      );
    } else {
      console.log("No internet connectivity.");
      Alert.alert(
        STRINGS.msgNoConnectivityTitle,
        STRINGS.msgNoConnectivityContent
      );
    }
  }

  handleRegisterResponse(res) {
    setTimeout(() => {
      this.props.setCustomerId(res.customerId);
      this.setState({ spinner: false });
      console.log(res);
      if (res.signupStatus === SUCCESS) {
        console.log("Sign up success. Saving data to DB.");
        this.setState(
          {
            emailVerificationStatus: res.emailVerificationStatus,
            mobileVerificationStatus: res.mobileVerificationStatus
          },
          () => {
            this.saveUserRegistrationData();
            this.navigateToMobileVerificationView();
          }
        );
      } else if (res.signupStatus === MOBILE_NUMBER_EXISTS) {
        console.log("Mobile number already exists.");
        if (res.mobileVerificationStatus === NOT_VERIFIED) {
          this.navigateToMobileVerificationView();
        } else {
          Alert.alert(
            STRINGS.msgMobileNumberAlreadyExistsTitle,
            STRINGS.msgMobileNumberAlreadyExistsContent,
            [
              {
                text: "Cancel",
                onPress: () =>
                  console.log(
                    "Cancel pressed in mobile number already exists dialog."
                  )
              },
              {
                text: "OK",
                onPress: () => {
                  console.log(
                    "OK pressed in mobile number already exists dialog. Moving to login screen."
                  );
                  this.props.navigation.navigate(VIEW_LOGIN);
                }
              }
            ]
          );
        }
      } else if (res.signupStatus === MOBILE_LINKED_WITH_OTHER_EMAIL) {
        Alert.alert(STRINGS.msgErrorTitle, res.message + ": " + res.email);
      } else if (res.signupStatus === EMAIL_LINKED_WITH_OTHER_MOBILE) {
        Alert.alert(STRINGS.msgErrorTitle, res.message + ": " + res.mobile);
      }
    }, 100);
  }

  navigateToMobileVerificationView() {
    this.props.setUserRegistrationData(this.state);
    this.props.navigation.navigate(VIEW_MOBILE_VERIFICATION);
  }

  saveUserRegistrationData() {
    console.log("saveUserRegistrationData method called.");
    DBService.insertIntoUserData(this.state);
  }

  render() {
    return (
      <Container>
        <Content padder>
          <View style={styles.mainView}>
            <View>
              <Form>
                <Item style={[styles.inputMargin]}>
                  <Label>Full name</Label>
                  <Input
                    onChangeText={value =>
                      this.setState({
                        firstName: value.trim(),
                        lastName: value.trim()
                      })
                    }
                  />
                </Item>
                <Item style={[styles.inputMargin, { marginTop: 10 }]}>
                  <Label>Date of birth</Label>
                  <DatePicker
                    date={this.state.dob}
                    mode="date"
                    placeholder="Select date"
                    format="DD-MM-YYYY"
                    maxDate={new Date()}
                    customStyles={{
                      dateIcon: {
                        position: "absolute",
                        left: 0,
                        top: 4,
                        marginLeft: 0
                      },
                      dateInput: {
                        marginLeft: 36
                      }
                    }}
                    onDateChange={date => {
                      this.setState({ dob: date });
                    }}
                  />
                </Item>
                <Item style={[styles.inputMargin]}>
                  <Label>Email</Label>
                  <Input
                    keyboardType="email-address"
                    onChangeText={value =>
                      this.setState({ email: value.trim() })
                    }
                  />
                </Item>
                <Item style={[styles.inputMargin]}>
                  <Label>Mobile</Label>
                  <Input
                    keyboardType={
                      Platform.OS === "ios" ? "number-pad" : "numeric"
                    }
                    onChangeText={value =>
                      this.setState({ mobile: value.trim() })
                    }
                  />
                </Item>
                <Item style={[styles.inputMargin]}>
                  <Label>Password</Label>
                  <Input
                    secureTextEntry={true}
                    onChangeText={value =>
                      this.setState({ password: value.trim() })
                    }
                  />
                </Item>
              </Form>
            </View>
            <View style={{ paddingTop: 20 }}>
              <Text style={styles.textSize}>
                By clicking "REGISTER", I confirm that I have read and agreed to
                the{" "}
                <Text
                  style={[styles.linkText, styles.textSize]}
                  onPress={() => this.props.navigation.navigate("terms")}
                >
                  Terms & Conditions
                </Text>{" "}
                and{" "}
                <Text
                  style={[styles.linkText, styles.textSize]}
                  onPress={() => this.props.navigation.navigate("privacy")}
                >
                  Privacy Policy
                </Text>
              </Text>
            </View>
            <View style={styles.btnView}>
              <Button
                style={[styles.registerBtn, styles.widthStyle]}
                full
                onPress={this.handleRegister}
              >
                <Text style={styles.btnText}>REGISTER</Text>
              </Button>
            </View>
            <Spinner
              visible={this.state.spinner}
              textStyle={{ color: "#fff" }}
              textContent={STRINGS.sendingVerificationCode}
            />
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    isNetworkConnected: state.isNetworkConnected
  };
};

export default connect(
  mapStateToProps,
  Actions
)(RegisterView);

const iconsSize = 20;
const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center"
  },
  image: {
    height: 100,
    width: 100
  },
  imageView: {
    // flex: 1,
    // justifyContent: 'center',
    alignItems: "center"
  },
  registerBtn: {
    backgroundColor: secondary
  },
  btnText: {
    color: primary
  },
  btnView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20
  },
  mainView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  text: {
    color: onPrimary
  },
  widthStyle: {
    width: "100%"
  },
  inputMargin: {
    marginLeft: 0
  },
  linkText: {
    color: secondaryDark
  },
  textSize: {
    fontSize: 12
  }
});
