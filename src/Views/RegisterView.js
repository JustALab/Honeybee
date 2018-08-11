import React from "react";
import { StyleSheet, View } from "react-native";
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

export class RegisterView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      dob: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: ""
    };
  }

  render() {
    return (
      <Container>
        <Content padder>
          <View style={styles.mainView}>
            <View>
              <Form>
                <Item style={[styles.inputMargin]}>
                  <Label>First name</Label>
                  <Input />
                </Item>
                <Item style={[styles.inputMargin]}>
                  <Label>Last name</Label>
                  <Input />
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
                  <Input keyboardType="email-address" />
                </Item>
                <Item style={[styles.inputMargin]}>
                  <Label>Mobile</Label>
                  <Input keyboardType="number-pad" />
                </Item>
                <Item style={[styles.inputMargin]}>
                  <Label>Password</Label>
                  <Input secureTextEntry={true} />
                </Item>
                <Item style={[styles.inputMargin]}>
                  <Label>Confirm password</Label>
                  <Input secureTextEntry={true} />
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
              <Button style={[styles.registerBtn, styles.widthStyle]} full>
                <Text style={styles.btnText}>REGISTER</Text>
              </Button>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

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
