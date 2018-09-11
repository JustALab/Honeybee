import React from "react";
import { connect } from "react-redux";
import * as Actions from "../Actions";
import {
  View,
  Picker,
  Item,
  Icon,
  Container,
  Content,
  Input
} from "native-base";
import { Dimensions, StyleSheet, Platform } from "react-native";
import CommonStyles from "../Commons/Styles";
import { Card, List, ListItem } from "react-native-elements";
import { ICONS } from "../Config/Icons";
import {
  PLACEHOLDER_COLOR,
  DEFAULT_BORDER_COLOR,
  ICON_ACTIVE
} from "../Config/Colors";
import { DBService } from "../Services/DBService";
import {
  INI_DELIVERY_LOCATION,
  INI_DELIVERY_ADDRESS,
  INI_DELIVERY_ADDRESS_TYPE,
  INI_DELIVERY_VENDOR_ID
} from "../Config/Strings";

class DeliveryDetailsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deliveryAddressType: this.props.deliveryDetails.deliveryAddressType,
      deliveryAddress: this.props.deliveryDetails.deliveryAddress,
      deliveryDate: this.props.deliveryDetails.deliveryDate,
      deliveryTime: this.props.deliveryDetails.deliveryTime,
      deliveryLocation: this.props.deliveryDetails.deliveryLocation,
      deliveryVendorId: this.props.deliveryDetails.deliveryVendorId
    };
    this.setDeliveryDetailsToReduxState = this.setDeliveryDetailsToReduxState.bind(
      this
    );
  }

  setDeliveryDetailsToReduxState() {
    const {
      deliveryAddressType,
      deliveryAddress,
      deliveryLocation,
      deliveryDate,
      deliveryTime,
      deliveryVendorId
    } = this.state;
    const { locationsList } = this.props;

    let locationName = this.state.deliveryLocation;
    let tempDeliveryVendorId = 0;
    for (let index = 0; index < locationsList.length; index++) {
      if (locationName === locationsList[index].locationName) {
        tempDeliveryVendorId = locationsList[index].deliveryVendorId;
        break;
      }
    }
    console.log(tempDeliveryVendorId);
    this.setState(
      {
        deliveryVendorId: tempDeliveryVendorId
      },
      () => {
        this.props.setDeliveryDetails({
          deliveryAddress,
          deliveryAddressType,
          deliveryLocation,
          deliveryDate,
          deliveryTime,
          deliveryVendorId
        });
        this.saveDeliveryDetailsIniData();
      }
    );
  }

  saveDeliveryDetailsIniData() {
    DBService.updateIni(INI_DELIVERY_LOCATION, this.state.deliveryLocation);
    DBService.updateIni(INI_DELIVERY_ADDRESS, this.state.deliveryAddress);
    DBService.updateIni(
      INI_DELIVERY_ADDRESS_TYPE,
      this.state.deliveryAddressType
    );
    DBService.updateIni(INI_DELIVERY_VENDOR_ID, this.state.deliveryVendorId);
  }

  renderAddressTypePicker() {
    return (
      <Item picker>
        <Picker
          mode="dialog"
          iosIcon={<Icon name="ios-arrow-down-outline" />}
          style={styles.picker}
          placeholder="Select place..."
          placeholderStyle={{ color: PLACEHOLDER_COLOR }}
          placeholderIconColor="#007aff"
          selectedValue={this.state.deliveryAddressType}
          onValueChange={value => this.setState({ deliveryAddressType: value })}
        >
          <Picker.Item label="Home" value="HOME" />
          <Picker.Item label="Office" value="OFFICE" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </Item>
    );
  }

  renderLocationPortion() {
    const { locationsList } = this.props;
    return (
      <View style={styles.locationView}>
        <View style={styles.itemView}>
          <Item picker>
            <Icon
              name={ICONS.location}
              style={styles.locationIcon}
              type="MaterialIcons"
            />
            <Picker
              mode="dialog"
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              style={styles.picker}
              placeholder="Select location..."
              placeholderStyle={{ color: PLACEHOLDER_COLOR }}
              placeholderIconColor="#007aff"
              selectedValue={this.state.deliveryLocation}
              onValueChange={value =>
                this.setState(
                  { deliveryLocation: value },
                  this.setDeliveryDetailsToReduxState
                )
              }
              headerTitleStyle={CommonStyles.headerTitle}
              iosHeader="Location"
            >
              {locationsList.map(locationData => (
                <Picker.Item
                  label={locationData.locationName}
                  value={locationData.locationName}
                  key={locationData.locationId}
                />
              ))}
            </Picker>
          </Item>
        </View>
      </View>
    );
  }

  renderAddressList() {
    const addressList = this.props.customerData.customerAddressList;
    return (
      <List>
        {addressList.map(address => (
          <ListItem
            key={address.addressId}
            title={address.deliveryAddressType}
            subtitle={address.address}
            subtitleNumberOfLines={4}
            rightIcon={{ name: ICONS.edit }}
            onPressRightIcon={() => {}}
          />
        ))}
      </List>
    );
  }

  renderAddressTextField() {
    return (
      <View style={styles.addressTextFieldView}>
        <Item>
          <Input
            placeholder="Address"
            placeholderTextColor={PLACEHOLDER_COLOR}
            autoCapitalize="sentences"
            style={styles.addressTextField}
            multiline
          />
        </Item>
      </View>
    );
  }

  renderAddressPortion() {
    return (
      <Card title="Delivery Address">
        {this.renderAddressTypePicker()}
        {this.renderAddressTextField()}
      </Card>
    );
  }

  render() {
    return (
      <Container style={CommonStyles.containerBg}>
        <Content padder>
          <View style={styles.mainView}>{this.renderLocationPortion()}</View>
          <View>{this.renderAddressPortion()}</View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  authToken: state.authToken,
  isNetworkConnected: state.isNetworkConnected,
  customerData: state.customerData,
  locationsList: state.locationsList,
  deliveryDetails: state.deliveryDetails
});

export default connect(
  mapStateToProps,
  Actions
)(DeliveryDetailsView);

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  mainView: {
    flexDirection: "column"
  },
  locationView: {
    height: screenHeight * 0.1
  },
  itemView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  picker: {
    width: undefined
  },
  addressTextField: {
    height: 100
  },
  addressTextFieldView: {
    borderColor: DEFAULT_BORDER_COLOR,
    borderStyle: "solid",
    borderBottomWidth: 1,
    marginTop: 10
  },
  locationIcon: {
    color: ICON_ACTIVE
  }
});
