import React from "react";
import { Alert, StyleSheet, View, TouchableOpacity } from "react-native";
import {
  Container,
  Content,
  Text,
  Button,
  Header,
  Right,
  Body,
  Title,
  Left,
  ActionSheet,
  Input,
  Item
} from "native-base";
import { FooterLab } from "../Components/FooterLab";
import {
  STRINGS,
  VIEW_PROFILE_PRIVACY,
  VIEW_PROFILE_TERMS,
  VIEW_LOGIN,
  SUCCESS,
  INCORRECT_OLD_PASSWORD
} from "../Config/Strings";
import { ICONS } from "../Config/Icons";
import { DBService } from "../Services/DBService";
import { connect } from "react-redux";
import ApiService from "../Services/ApiService";
import * as Actions from "../Actions";
import Spinner from "react-native-loading-spinner-overlay";
import {
  WHITE,
  ON_PRIMARY,
  BACKGROUND_1,
  SECONDARY_DARK,
  ON_SECONDARY,
  SECONDARY
} from "../Config/Colors";
import { Avatar, List, ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import commonStyles from "../Commons/Styles";
import Modal from "react-native-modalbox";

class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      changePasswordSpinner: false,
      dataReady: false,
      customerAddresses: [],
      isChangePasswordModalVisible: false,
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      reponseText: "",
      isChangePasswordFailure: false,
      showPasswordErrorMsg: false
    };
    this._handleLogOut = this._handleLogOut.bind(this);
    this._deleteAddress = this._deleteAddress.bind(this);
    this._handleChangePassword = this._handleChangePassword.bind(this);
  }

  componentDidMount() {
    if (this.props.customerData !== null) {
      this.setState({ dataReady: true });
    }
    if (this.props.customerData === null) {
      if (this.props.isNetworkConnected) {
        this.setState({ spinner: true }, () => {
          ApiService.getCustomerData(this.props.authToken, data => {
            console.log(data);
            this.props.setCustomerData(data);
            this.setState({
              spinner: false,
              dataReady: true,
              customerAddresses: data.customerAddressList
            });
          });
        });
      } else {
        console.log("No internet connectivity.");
        Alert.alert(
          STRINGS.msgNoConnectivityTitle,
          STRINGS.msgNoConnectivityContent
        );
      }
    } else {
      this.setState({
        customerAddresses: this.props.customerData.customerAddressList
      });
    }
  }

  _handleLogOut() {
    console.log("Log out called.");
    Alert.alert(STRINGS.confirm, STRINGS.areYouSure, [
      {
        text: "Yes",
        onPress: () => {
          DBService.unsetLoggedInStatus();
          this.props.setCustomerData(null);
          this.props.navigation.navigate(VIEW_LOGIN);
          console.log("Logging out.");
        }
      },
      { text: "No" }
    ]);
  }

  _renderAvatarTexts() {
    if (this.props.customerData != null) {
      return (
        <View>
          <View style={styles.avatarTextView}>
            <Text style={styles.avatarNameText}>
              {this.props.customerData.firstName}
            </Text>
          </View>
          <View style={[styles.avatarContactView, styles.avatarTextView]}>
            <Text style={styles.avatarContactText}>
              {this.props.customerData.mobile}
            </Text>
            <Text style={{ color: ON_PRIMARY }}> | </Text>
            <Text style={styles.avatarContactText}>
              {this.props.customerData.email}
            </Text>
          </View>
        </View>
      );
    }

    return <View />;
  }

  _renderAddressList() {
    const addressList = this.state.customerAddresses;
    return (
      <View style={styles.addressList}>
        <List>
          {addressList.map(address => (
            <ListItem
              key={address.addressId}
              title={address.deliveryAddressType}
              subtitle={address.address}
              subtitleNumberOfLines={4}
              rightIcon={{ name: ICONS.delete }}
              onPressRightIcon={() => this._deleteAddress(address.addressId)}
            />
          ))}
        </List>
      </View>
    );
  }

  _deleteAddress(addressId) {
    Alert.alert(STRINGS.confirm, STRINGS.areYouSure, [
      {
        text: "Yes",
        onPress: () => {
          let addressList = this.state.customerAddresses;
          for (let index = 0; index < addressList.length; index++) {
            if (addressList[index].addressId === addressId) {
              addressList.splice(index, 1);
              break;
            }
          }
          ApiService.deleteCustomerAddress(this.props.authToken, addressId);
          this.setState({ customerAddresses: addressList }, () => {
            let customerData = this.props.customerData;
            customerData.customerAddressList = addressList;
            this.props.setCustomerData(customerData);
          });
        }
      },
      { text: "No" }
    ]);
  }

  _renderAvatar() {
    return (
      <Avatar
        large
        rounded
        source={require("./images/user_avatar.jpg")}
        onPress={() => console.log("Works!")}
        activeOpacity={0.7}
      />
    );
  }

  _enableDdisableChangePasswordButton() {
    const { oldPassword, newPassword, confirmNewPassword } = this.state;
    if (
      oldPassword.length > 0 &&
      newPassword.length > 0 &&
      confirmNewPassword.length > 0
    ) {
      return false;
    }
    return true;
  }

  _handleChangePassword() {
    const { oldPassword, newPassword, confirmNewPassword } = this.state;
    if (newPassword === confirmNewPassword) {
      this.setState({ showPasswordErrorMsg: false }, () => {
        this.setState({ changePasswordSpinner: true }, () => {
          ApiService.changePassword(
            oldPassword,
            newPassword,
            this.props.authToken,
            res => {
              console.log(res);
              this.setState({ changePasswordSpinner: false }, () => {
                let response = "";
                if (res === INCORRECT_OLD_PASSWORD) {
                  response = STRINGS.incorrectOldPassword;
                  this.setState({
                    reponseText: response,
                    showPasswordErrorMsg: true
                  });
                } else {
                  this.setState({
                    showPasswordErrorMsg: false,
                    isChangePasswordModalVisible: false
                  });
                }
              });
            }
          );
        });
      });
    } else {
      let response = STRINGS.msgPasswordNoMatchContent;
      this.setState({ reponseText: response }, () => {
        this.setState({ showPasswordErrorMsg: true });
      });
    }
  }

  _renderChangePasswordModal() {
    return (
      <Modal
        style={[styles.modal, styles.changePasswordModal]}
        position={"center"}
        isDisabled={this.state.isModalDisabled}
        isOpen={this.state.isChangePasswordModalVisible}
        onClosed={() => this.setState({ isChangePasswordModalVisible: false })}
        backButtonClose={true}
        coverScreen={true}
      >
        <View style={styles.changePasswordModalView}>
          <Item>
            <Input
              placeholder="Old Password"
              onChangeText={value =>
                this.setState({ oldPassword: value.trim() })
              }
              secureTextEntry
            />
          </Item>
          <Item>
            <Input
              placeholder="New Password"
              onChangeText={value =>
                this.setState({ newPassword: value.trim() })
              }
              secureTextEntry
            />
          </Item>
          <Item>
            <Input
              placeholder="Confirm New Password"
              onChangeText={value =>
                this.setState({ confirmNewPassword: value.trim() })
              }
              secureTextEntry
            />
          </Item>
          {this.state.showPasswordErrorMsg && (
            <View>
              <Text style={styles.passwordErrorMsg}>
                {this.state.reponseText}
              </Text>
            </View>
          )}
          <Button
            full
            transparent
            disabled={this._enableDdisableChangePasswordButton()}
            onPress={this._handleChangePassword}
          >
            <Text style={styles.changePasswordButtonText}>Change Password</Text>
          </Button>
          <Spinner visible={this.state.changePasswordSpinner} />
        </View>
      </Modal>
    );
  }

  _renderHeader() {
    const ACTION_SHEET_BUTTONS = [
      "Change Password",
      STRINGS.privacyPolicy,
      STRINGS.termsConditions,
      "Log Out",
      "Cancel"
    ];
    const CANCEL_INDEX = 4;
    const DESTRUCTIVE_INDEX = 3;

    return (
      <Header style={commonStyles.headerBg}>
        <Left />
        <Body>
          <Title style={commonStyles.headerTitle}>Profile</Title>
        </Body>
        <Right>
          <TouchableOpacity
            onPress={() => {
              ActionSheet.show(
                {
                  options: ACTION_SHEET_BUTTONS,
                  cancelButtonIndex: CANCEL_INDEX,
                  destructiveButtonIndex: DESTRUCTIVE_INDEX
                },
                buttonIndex => {
                  switch (buttonIndex) {
                    case 0:
                      console.log("Change password clicked.");
                      this.setState({ isChangePasswordModalVisible: true });
                      break;
                    case 1:
                      console.log("Moving to privacy policy.");
                      this.props.navigation.navigate(VIEW_PROFILE_PRIVACY);
                      break;
                    case 2:
                      console.log("Moving to terms and conditions.");
                      this.props.navigation.navigate(VIEW_PROFILE_TERMS);
                      break;
                    case 3:
                      console.log("Logging Out");
                      this._handleLogOut();
                      break;
                  }
                }
              );
            }}
          >
            <Icon name={ICONS.verticalDots} size={ICON_SIZE} />
          </TouchableOpacity>
        </Right>
      </Header>
    );
  }

  render() {
    return (
      <Container>
        {this._renderHeader()}
        <Content style={styles.content} scrollEnabled={false}>
          <View style={styles.avatarView}>
            {this._renderAvatar()}
            {this.state.dataReady && this._renderAvatarTexts()}
          </View>
          {this.state.dataReady && this._renderAddressList()}
          <Spinner visible={this.state.spinner} />
          {this._renderChangePasswordModal()}
        </Content>
        <FooterLab activeButton={STRINGS.profile} {...this.props} />
      </Container>
    );
  }
}

const ICON_SIZE = 25;

const mapStateToProps = state => ({
  authToken: state.authToken,
  isNetworkConnected: state.isNetworkConnected,
  customerData: state.customerData
});

export default connect(
  mapStateToProps,
  Actions
)(ProfileView);

const styles = StyleSheet.create({
  content: {
    backgroundColor: BACKGROUND_1
  },
  avatarView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    backgroundColor: BACKGROUND_1
  },
  avatarNameText: {
    color: ON_PRIMARY,
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 18
  },
  avatarContactText: {
    color: ON_PRIMARY,
    marginTop: 5,
    fontSize: 13
  },
  avatarContactView: {
    flexDirection: "row"
  },
  avatarTextView: {
    justifyContent: "center",
    alignItems: "center"
  },
  addressList: {
    marginTop: -15
  },
  changePasswordButtonText: {
    color: SECONDARY,
    fontWeight: "bold"
  },
  changePasswordModalView: {
    width: "90%"
  },
  passwordErrorMsg: {
    color: "red",
    fontSize: 15,
    paddingTop: 8,
    paddingBottom: 8
  },
  changePasswordModal: {
    height: 210,
    width: 300
  },
  modal: {
    justifyContent: "center",
    alignItems: "center"
  }
});
