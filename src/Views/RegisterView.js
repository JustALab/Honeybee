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
import {
  primary,
  secondary,
  onPrimary,
  onSecondary,
  secondaryDark
} from "../Config/Colors";
import { DatePicker } from "../Components/Datepicker/Datepicker";
import { connect } from "react-redux";
import { STRINGS } from "../Config/Strings";
import ApiService from "../Services/ApiService";

class RegisterView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      dob: "",
      email: "",
      mobile: "",
      password: ""
    };
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleRegister() {
    if (this.props.isNetworkConnected) {
      ApiService.signUpCustomer(this.state, res => {
        console.log(res);

        //reset state to initial state
        this.setState(this.baseState);
      });
    } else {
      console.log("No internet connectivity.");
      Alert.alert(
        STRINGS.msgNoConnectivityTitle,
        STRINGS.msgNoConnectivityContent
      );
    }
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

export default connect(mapStateToProps)(RegisterView);

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
