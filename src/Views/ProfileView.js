import React from "react";
import { Alert, StyleSheet, View, TouchableOpacity, Modal } from "react-native";
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
  ActionSheet
} from "native-base";
import { FooterLab } from "../Components/FooterLab";
import {
  STRINGS,
  VIEW_PROFILE_PRIVACY,
  VIEW_PROFILE_TERMS,
  VIEW_LOGIN
} from "../Config/Strings";
import { ICONS } from "../Config/Icons";
import { DBService } from "../Services/DBService";
import { connect } from "react-redux";
import ApiService from "../Services/ApiService";
import * as Actions from "../Actions";
import Spinner from "react-native-loading-spinner-overlay";
import { white, onPrimary, background1, secondaryDark } from "../Config/Colors";
import { Avatar, List, ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import commonStyles from "../Commons/Styles";

class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      dataReady: false,
      customerAddresses: [],
      modalVisible: false
    };
    this.handleLogOut = this.handleLogOut.bind(this);
    this.deleteAddress = this.deleteAddress.bind(this);
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

  handleLogOut() {
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

  renderAvatarTexts() {
    if(this.props.customerData != null) {
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
            <Text style={{ color: onPrimary }}> | </Text>
            <Text style={styles.avatarContactText}>
              {this.props.customerData.email}
            </Text>
          </View>
        </View>
      );
    } 

    return <View />;
  }

  renderAddressList() {
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
              onPressRightIcon={() => this.deleteAddress(address.addressId)}
            />
          ))}
        </List>
      </View>
    );
  }

  deleteAddress(addressId) {
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

  renderAvatar() {
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

  showModal() {
    this.setState({ modalVisible: true });
  }

  hideModal() {
    this.setState({ modalVisible: false });
  }

  renderChangePasswordModal() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
        presentationStyle="formSheet"
      >
        <View>
          <Header>
            <Left>
              <TouchableOpacity onPress={() => this.hideModal()}>
                <Icon
                  name={ICONS.close}
                  size={ICON_SIZE}
                  style={styles.modalCloseIcon}
                />
              </TouchableOpacity>
            </Left>
            <Body style={commonStyles.headerBody}>
              <Title style={commonStyles.headerTitle}>Change Password</Title>
            </Body>
            <Right>
              <TouchableOpacity>
                <Text style={styles.modalSaveButton}>Save</Text>
              </TouchableOpacity>
            </Right>
          </Header>
        </View>
      </Modal>
    );
  }

  renderHeader() {
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
      <Header>
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
                      this.showModal();
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
                      this.handleLogOut();
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
        {this.renderHeader()}
        <Content style={styles.content} scrollEnabled={false}>
          <View style={styles.avatarView}>
            {this.renderAvatar()}
            {this.state.dataReady && this.renderAvatarTexts()}
          </View>
          {this.state.dataReady && this.renderAddressList()}
          <Spinner visible={this.state.spinner} textStyle={{ color: white }} />
          {this.renderChangePasswordModal()}
        </Content>
        <FooterLab activeButton={STRINGS.profile} {...this.props} />
      </Container>
    );
  }
}

const ICON_SIZE = 25;

const mapStateToProps = state => {
  console.log(state);
  return {
    authToken: state.authToken,
    isNetworkConnected: state.isNetworkConnected,
    customerData: state.customerData
  };
};

export default connect(
  mapStateToProps,
  Actions
)(ProfileView);

const styles = StyleSheet.create({
  content: {
    backgroundColor: background1
  },
  avatarView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    backgroundColor: background1
  },
  avatarNameText: {
    color: onPrimary,
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 18
  },
  avatarContactText: {
    color: onPrimary,
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
  modalSaveButton: {
    color: secondaryDark
  },
  modalCloseIcon: {
    color: secondaryDark
  }
});
