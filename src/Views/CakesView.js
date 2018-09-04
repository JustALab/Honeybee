import React from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  Modal
} from "react-native";
import {
  Container,
  Content,
  Body,
  Header,
  Form,
  Item,
  Icon
} from "native-base";
import { FooterLab } from "../Components/FooterLab";
import { STRINGS, VIEW_DELIVERY_DETAILS } from "../Config/Strings";
import { primary, onPrimary, iconActive, secondary } from "../Config/Colors";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { ICONS } from "../Config/Icons";
import CommonStyles from "../Commons/Styles";
import { Col, Grid } from "react-native-easy-grid";
import { connect } from "react-redux";
import * as Actions from "../Actions";
import Spinner from "react-native-loading-spinner-overlay";
import ApiService from "../Services/ApiService";

class CakesView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      dataReady: false
    };
  }

  componentDidMount() {
    if (this.props.customerData !== null) {
      this.setState({ dataReady: true });
    }
    if (this.props.customerData == null) {
      if (this.props.isNetworkConnected) {
        //set spinner true and get all data from Honeycomb and then set spinner false
        this.setState({ spinner: true }, () => {
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

          Promise.all([promiseCustomerData, promiseLocationsList]).then(
            values => {
              console.log(values);
              this.props.setCustomerData(values[0]);
              this.props.setLocationsList(values[1]);
              this.setState({
                spinner: false,
                dataReady: true,
                customerAddressList: values[0].customerAddressList,
                locationsList: values[1]
              });
            }
          );
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
        <Header>
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
    color: iconActive
  },
  headerLocationText: {
    color: onPrimary,
    marginTop: 3,
    flex: 1,
    flexWrap: "wrap",
    marginLeft: 3,
    fontSize: 13
  },
  headerTimeText: {
    color: onPrimary,
    marginTop: 0,
    flex: 1,
    flexWrap: "wrap",
    marginLeft: 3,
    fontSize: 18,
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
    justifyContent: "flex-start",
    alignItems: "center"
  }
});
