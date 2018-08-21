import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Alert,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView
} from "react-native";
import {
  Container,
  Content,
  Form,
  Input,
  Item,
  Text,
  Button
} from "native-base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FaIcon from "react-native-vector-icons/FontAwesome";
import { ICONS } from "../Config/Icons";
import {
  primary,
  secondary,
  onPrimary,
  secondaryDark,
  iconInactive,
  logoTeal,
  white
} from "../Config/Colors";
import { STRINGS, VIEW_REGISTER, VIEW_MAIN } from "../Config/Strings";
import { DBService } from "../Services/DBService";
import { connect } from "react-redux";
import ApiService from "../Services/ApiService";
import * as Actions from "../Actions";
import * as Animatable from "react-native-animatable";
import Spinner from "react-native-loading-spinner-overlay";

class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: "",
      password: "",
      loginButtonDisable: false,
      spinner: false
    };
  }

  validateFields() {
    console.log(this.state.mobile);
    console.log(this.state.password);
    //this == & != operator will check for both null and undefined
    if (
      this.state.mobile != null &&
      this.state.mobile !== "" &&
      this.state.password != null &&
      this.state.password !== ""
    ) {
      console.log("All fields are OK.");
      isFieldsOk = true;
    } else {
      console.log("All fields are NOT OK. handleLogin() not executed.");
      isFieldsOk = false;
    }
    return isFieldsOk;
  }

  handleLogin = () => {
    if (this.validateFields()) {
      //diable login button
      this.setState({ loginButtonDisable: true, spinner: true }, () => {
        if (this.props.isNetworkConnected) {
          ApiService.login(
            {
              username: this.state.mobile,
              password: this.state.password
            },
            token => {
              if (token !== null) {
                console.log("Login success! Token: " + token);
                this.props.setAuthToken(token);
                DBService.insertIntoLoginData(this.state.mobile, token);
                this.setState({ spinner: false });
                this.props.navigation.navigate(VIEW_MAIN);
              } else {
                this.setState(
                  { loginButtonDisable: false, spinner: false },
                  () =>
                    setTimeout(() => {
                      console.log("Login failure.");
                      Alert.alert(
                        STRINGS.msgIncorrectCredentialsTitle,
                        STRINGS.msgIncorrectCredentialsContent
                      );
                    }, 10)
                );
              }
            }
          );
        } else {
          console.log("No internet connectivity.");
          this.setState(
            { loginButtonDisable: false, spinner: false },
            () =>
              setTimeout(() => {
                Alert.alert(
                  STRINGS.msgNoConnectivityTitle,
                  STRINGS.msgNoConnectivityContent
                );
              }),
            10
          );
        }
      });
    }
  };

  render() {
    return (
      <Container>
        <Content
          padder
          contentContainerStyle={styles.content}
          scrollEnabled={false}
        >
          <KeyboardAvoidingView
            style={styles.mainView}
            behavior="padding"
            enabled
          >
            <Animatable.View animation="slideInUp" style={styles.imageView}>
              <Image
                style={styles.image}
                resizeMode={"contain"}
                source={require("./images/hc_300.png")}
              />
            </Animatable.View>
            <Animatable.View animation="fadeInUp">
              <View>
                <Form>
                  <Item style={[styles.widthStyle, styles.inputMargin]}>
                    <Input
                      placeholder="Mobile number"
                      keyboardType={
                        Platform.OS === "ios" ? "number-pad" : "numeric"
                      }
                      onChangeText={value =>
                        this.setState({ mobile: value.trim() })
                      }
                      autoCapitalize="none"
                      maxLength={10}
                      value={this.state.mobile}
                    />
                    <FaIcon
                      size={iconsSize + 8}
                      name={ICONS.mobile}
                      style={[{ marginRight: 5 }, styles.iconColor]}
                    />
                  </Item>
                  <Item style={[styles.inputMargin, styles.widthStyle]}>
                    <Input
                      placeholder="Password"
                      secureTextEntry={true}
                      onChangeText={value =>
                        this.setState({ password: value.trim() })
                      }
                      autoCapitalize="none"
                      value={this.state.password}
                    />
                    <Icon
                      size={iconsSize}
                      name={ICONS.lock}
                      style={styles.iconColor}
                    />
                  </Item>
                </Form>
              </View>
              <View style={styles.btnView}>
                <Button
                  style={[styles.signInBtn, { width: "35%" }]}
                  onPress={this.handleLogin}
                  disabled={this.state.loginButtonDisable}
                  full
                >
                  <Text style={styles.btnText}>Log In</Text>
                </Button>
              </View>
              <View style={styles.linksView}>
                <Text
                  style={[styles.text, { color: secondaryDark }]}
                  onPress={() => this.props.navigation.navigate(VIEW_REGISTER)}
                >
                  Register
                </Text>
                <Text> | </Text>
                <Text style={styles.text}>Forgot Password</Text>
              </View>
            </Animatable.View>
          </KeyboardAvoidingView>
          <Spinner visible={this.state.spinner} textStyle={{ color: white }} />
        </Content>
      </Container>
    );
  }
}

const iconsSize = 25;
const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center"
  },
  image: {
    height: 100,
    width: 100,
    marginBottom: 20
  },
  imageView: {
    alignItems: "center"
  },
  signInBtn: {
    backgroundColor: secondary,
    borderRadius: 25,
    backgroundColor: logoTeal
  },
  btnText: {
    color: primary,
    textAlign: "center"
  },
  btnView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15
  },
  mainView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  linksView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10
  },
  text: {
    color: onPrimary,
    fontSize: 14
  },
  registerBtnText: {
    color: secondaryDark
  },
  widthStyle: {
    width: "100%"
  },
  inputMargin: {
    marginLeft: 0
  },
  iconColor: {
    color: iconInactive
  }
});

const mapStateToProps = state => {
  return {
    isNetworkConnected: state.isNetworkConnected
  };
};

export default connect(
  mapStateToProps,
  Actions
)(LoginView);
