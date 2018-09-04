import React from "react";
import { connect } from "react-redux";
import * as Actions from "../Actions";
import { View, Picker, Item, Form, Icon, Label } from "native-base";

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
      }
    );
  }

  renderAddressTypePicker() {
    return (
      <Item picker>
        <Picker
          mode="dialog"
          iosIcon={<Icon name="ios-arrow-down-outline" />}
          style={{ width: "100%" }}
          placeholder="Select place..."
          placeholderStyle={{ color: "#bfc6ea" }}
          placeholderIconColor="#007aff"
          selectedValue={this.props.deliveryDetails.deliveryAddressType}
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
      <View>
        <Item picker>
          <Label>Delivery Area</Label>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="ios-arrow-down-outline" />}
            style={{ width: "100%" }}
            placeholder="Select location..."
            placeholderStyle={{ color: "#bfc6ea" }}
            placeholderIconColor="#007aff"
            selectedValue={this.state.deliveryLocation}
            onValueChange={value =>
              this.setState(
                { deliveryLocation: value },
                this.setDeliveryDetailsToReduxState
              )
            }
          >
            {locationsList.map(locationData => (
              <Picker.Item
                label={locationData.locationName}
                value={locationData.locationName}
                key={locationData.deliveryVendorId}
              />
            ))}
          </Picker>
        </Item>
      </View>
    );
  }

  render() {
    return <View>{this.renderLocationPortion()}</View>;
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
