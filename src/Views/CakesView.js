import React from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  TouchableOpacity
} from "react-native";
import { Container, Content, Body, Header } from "native-base";
import { FooterLab } from "../Components/FooterLab";
import {
  STRINGS,
  VIEW_DELIVERY_DETAILS,
  INI_DELIVERY_LOCATION,
  INI_DELIVERY_ADDRESS,
  INI_DELIVERY_ADDRESS_TYPE,
  INI_DELIVERY_VENDOR_ID
} from "../Config/Strings";
import { PRIMARY, ON_PRIMARY, ICON_ACTIVE, SECONDARY } from "../Config/Colors";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { ICONS } from "../Config/Icons";
import CommonStyles from "../Commons/Styles";
import { Col, Grid } from "react-native-easy-grid";
import { connect } from "react-redux";
import * as Actions from "../Actions";
import Spinner from "react-native-loading-spinner-overlay";
import ApiService from "../Services/ApiService";
import { DBService } from "../Services/DBService";

class CakesView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      dataReady: false
    };
  }

  componentWillMount() {
    console.disableYellowBox = true;
  }

  componentDidMount() {
    if (this.props.customerData !== null) {
      this.setState({ dataReady: true });
    }
    if (this.props.customerData == null) {
      if (this.props.isNetworkConnected) {
        //set spinner true and get all data from Honeycomb and also from local db and then set spinner false
        this.setState({ spinner: true }, () => {
          this.getData();
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

  getData() {
    //get customer data
    let promiseCustomerData = new Promise((resolve, reject) => {
      ApiService.getCustomerData(this.props.authToken, data => {
        if (data !== null) {
          resolve(data);
        } else {
          reject(null);
        }
      });
    });

    //get locations list
    let promiseLocationsList = new Promise((resolve, reject) => {
      ApiService.getLocationList(this.props.authToken, data => {
        if (data !== null) {
          resolve(data);
        } else {
          reject(null);
        }
      });
    });

    //get delivery address
    let deliveryAddressIniPromise = new Promise((resolve, reject) => {
      const deliveryAddress = DBService.getIniData(INI_DELIVERY_ADDRESS);
      if (deliveryAddress !== null) {
        resolve(deliveryAddress);
      } else {
        reject(deliveryAddress);
      }
    });

    //get delivery address type
    let deliveryAddressTypeIniPromise = new Promise((resolve, reject) => {
      const deliveryAddressTypeIniData = DBService.getIniData(
        INI_DELIVERY_ADDRESS_TYPE
      );
      if (deliveryAddressTypeIniData !== null) {
        resolve(deliveryAddressTypeIniData);
      } else {
        reject(deliveryAddressTypeIniData);
      }
    });

    //get location ini data
    let locationIniPromise = new Promise((resolve, reject) => {
      DBService.getIniData(INI_DELIVERY_LOCATION, locationName => {
        resolve(locationName);
      });
    });

    //get delivery vendor ID
    let deliveryVendorIdIniPromise = new Promise((resolve, reject) => {
      DBService.getIniData(INI_DELIVERY_VENDOR_ID, vendorId => {
        resolve(vendorId);
      });
    });

    Promise.all([
      promiseCustomerData,
      promiseLocationsList,
      locationIniPromise,
      // deliveryAddressIniPromise,
      // deliveryAddressTypeIniPromise,
      deliveryVendorIdIniPromise
    ])
      .then(values => {
        this.props.setCustomerData(values[0]);
        this.props.setLocationsList(values[1]);
        this.props.setDeliveryDetails({
          ...this.props.deliveryDetails,
          deliveryLocation: values[2],
          deliveryVendorId: values[3]
        });
        this.setState({
          spinner: false,
          dataReady: true
        });
      })
      .catch(err => console.log(err.message));
  }

  /**
   * renderHeaderLocationText method appends delivery location name if delivery address is given by the user.
   */
  renderHeaderLocationText() {
    const { deliveryDetails } = this.props;
    if (deliveryDetails.deliveryAddress === STRINGS.chooseLocation) {
      return (
        <Text style={styles.headerLocationText}>
          {deliveryDetails.deliveryAddress}
        </Text>
      );
    }
    return (
      <Text style={styles.headerLocationText}>
        {deliveryDetails.deliveryAddress +
          " " +
          deliveryDetails.deliveryLocation}
      </Text>
    );
  }

  renderHeader() {
    const { deliveryDetails } = this.props;
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate(VIEW_DELIVERY_DETAILS)}
      >
        <Header style={CommonStyles.headerBg}>
          <Body style={styles.headerBody}>
            <Grid>
              <Col size={75} style={styles.locationViewCol}>
                <View style={styles.locationView}>
                  <MaterialIcon
                    name={ICONS.location}
                    size={iconSize}
                    style={[styles.headerIcon, { marginTop: 6 }]}
                  />
                  {this.renderHeaderLocationText()}
                </View>
              </Col>
              <Col size={25} style={styles.timeViewCol}>
                <View style={styles.timeView}>
                  <MaterialIcon
                    name={ICONS.time}
                    size={iconSize}
                    style={styles.headerIcon}
                  />
                  <Text style={[styles.headerTimeText]}>
                    {deliveryDetails.deliveryTime}
                  </Text>
                </View>
              </Col>
            </Grid>
          </Body>
        </Header>
      </TouchableOpacity>
    );
  }

  renderSpinner() {
    return <Spinner visible={this.state.spinner} />;
  }

  render() {
    return (
      <Container>
        <StatusBar barStyle="dark-content" backgroundColor="black" />
        {this.renderHeader()}
        <Content style={CommonStyles.statusBarMargin}>
          {this.renderSpinner()}
        </Content>
        <FooterLab activeButton={STRINGS.cakes} {...this.props} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  authToken: state.authToken,
  isNetworkConnected: state.isNetworkConnected,
  customerData: state.customerData,
  deliveryDetails: state.deliveryDetails
});

export default connect(
  mapStateToProps,
  Actions
)(CakesView);

const iconSize = 25;
const styles = StyleSheet.create({
  headerBody: {
    flex: 3
  },
  headerIcon: {
    color: ICON_ACTIVE
  },
  headerLocationText: {
    color: ON_PRIMARY,
    marginTop: 3,
    flex: 1,
    flexWrap: "wrap",
    marginLeft: 3,
    fontSize: 13
  },
  headerTimeText: {
    color: ON_PRIMARY,
    marginTop: 0,
    flex: 1,
    flexWrap: "wrap",
    marginLeft: 3,
    fontSize: 14,
    fontWeight: "bold"
  },
  locationView: {
    flexDirection: "row",
    alignItems: "center"
  },
  timeView: {
    flexDirection: "row",
    alignItems: "center"
  },
  timeViewCol: {
    justifyContent: "center",
    alignItems: "flex-end"
  },
  locationViewCol: {
    justifyContent: "center",
    alignItems: "flex-start"
  }
});
