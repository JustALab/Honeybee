import React from "react";
import {
  StyleSheet,
  View,
  Image,
  NetInfo,
  Alert,
  ActivityIndicator
} from "react-native";
import {
  Container,
  Content,
  Form,
  Input,
  Item,
  Text,
  Button,
  Spinner
} from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import { ICONS } from "../Config/Icons";
import {
  primary,
  secondary,
  onPrimary,
  onSecondary,
  secondaryDark,
  iosBlue,
  primaryDark
} from "../Config/Colors";
import { STRINGS } from "../Config/Strings";
import Api from "../Services/Api";
import { DBService } from "../Services/DBService";

const isFieldsOk = false;

export class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loginButtonDisable: false,
      isLoading: false,
      isNetworkConnected: ""
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleConnectionChange
    );

    NetInfo.isConnected.fetch().done(isConnected => {
      this.setState({ isNetworkConnected: isConnected });
    });
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleConnectionChange
    );
  }

  handleConnectionChange = isConnected => {
    this.setState({ isNetworkConnected: isConnected });
    if (!this.state.isNetworkConnected) {
      Alert.alert(
        STRINGS.msgNoConnectivityTitle,
        STRINGS.msgNoConnectivityContent
      );
    }
  };

  validateFields = () => {
    console.log(this.state.email);
    console.log(this.state.password);
    //this == & != operator will check for both null and undefined
    if (
      this.state.email != null &&
      this.state.email !== "" &&
      this.state.password != null &&
      this.state.password !== ""
    ) {
      console.log("All fields are OK.");
      isFieldsOk = true;
    } else {
      console.log("All fields are NOT OK. handleLogin() not executed.");
      isFieldsOk = false;
    }
  };

  handleLogin = () => {
    this.validateFields();
    if (isFieldsOk) {
      //diable login button
      this.setState({ loginButtonDisable: true, isLoading: true });
      let loginPayload = {
        username: this.state.email,
        password: this.state.password
      };
      NetInfo.isConnected.fetch().then(isConnected => {
        if (isConnected) {
          Api.login(loginPayload, token => {
            if (token !== null) {
              console.log("Login success! Token: " + token);
              DBService.insertIntoUserData(this.state.email, token);
              this.props.navigation.navigate("mainView");
            } else {
              this.setState({ loginButtonDisable: false, isLoading: false });
              console.log("Login failure.");
              Alert.alert(
                STRINGS.msgIncorrectCredentialsTitle,
                STRINGS.msgIncorrectCredentialsContent
              );
            }
          });
        } else {
          Alert.alert(
            STRINGS.msgNoConnectivityTitle,
            STRINGS.msgNoConnectivityContent
          );
        }
      });
    }
  };

  render() {
    return (
      <Container>
        <Content padder contentContainerStyle={styles.content}>
          <View style={styles.mainView}>
            <View style={styles.imageView}>
              <Image
                style={styles.image}
                resizeMode={"contain"}
                source={require("./images/hc_300.png")}
              />
            </View>
            <View>
              <Form>
                <Item style={[styles.widthStyle, styles.inputMargin]}>
                  <Input
                    placeholder="Email"
                    keyboardType="email-address"
                    onChangeText={value =>
                      this.setState({ email: value.trim() })
                    }
                    autoCapitalize="none"
                  />
                  <Icon size={iconsSize} name={ICONS.mail} />
                </Item>
                <Item style={[styles.inputMargin, styles.widthStyle]}>
                  <Input
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={value =>
                      this.setState({ password: value.trim() })
                    }
                  />
                  <Icon size={iconsSize} name={ICONS.key} />
                </Item>
              </Form>
            </View>
            <View style={styles.linksView}>
              <Text
                style={{ color: secondaryDark }}
                onPress={() => this.props.navigation.navigate("register")}
              >
                Register
              </Text>
              <Text style={styles.text}> | </Text>
              <Text style={styles.text}>Forgot Password</Text>
            </View>
            <View style={styles.btnView}>
              <Button
                style={[styles.signInBtn, styles.widthStyle]}
                onPress={this.handleLogin}
                full
                disabled={this.state.loginButtonDisable}
              >
                <Text style={styles.btnText}>SIGN IN</Text>
              </Button>
            </View>
          </View>
          {this.state.isLoading && (
            <View style={styles.spinner}>
              <ActivityIndicator size="large" color={secondaryDark} />
            </View>
          )}
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
    width: 100
  },
  imageView: {
    // flex: 1,
    // justifyContent: 'center',
    alignItems: "center"
  },
  signInBtn: {
    backgroundColor: secondary
  },
  btnText: {
    color: primary
  },
  btnView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30
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
    color: onPrimary
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
  spinner: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});
