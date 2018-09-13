import React from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  FlatList
} from "react-native";
import { Container, Content, Body, Header, Icon } from "native-base";
import { FooterLab } from "../Components/FooterLab";
import {
  STRINGS,
  VIEW_DELIVERY_DETAILS,
  INI_DELIVERY_LOCATION,
  INI_DELIVERY_ADDRESS,
  INI_DELIVERY_ADDRESS_TYPE,
  INI_DELIVERY_VENDOR_ID,
  ITEM_CATEGORY_CAKE,
  ITEM_CATEGORY_PARTY_PACK,
  AVAILABLE
} from "../Config/Strings";
import { ON_PRIMARY, ICON_ACTIVE } from "../Config/Colors";
import { ICONS } from "../Config/Icons";
import CommonStyles from "../Commons/Styles";
import { Col, Grid, Row } from "react-native-easy-grid";
import { connect } from "react-redux";
import * as Actions from "../Actions";
import Spinner from "react-native-loading-spinner-overlay";
import ApiService from "../Services/ApiService";
import { DBService } from "../Services/DBService";
import ItemCard from "../Components/ItemCard";
import { filterItems } from "../Commons/Utils";
import * as Animatable from "react-native-animatable";

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
          this._getData();
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

  _getData() {
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
        this._getVendorItemsList();
      })
      .catch(err => console.log(err.message));
  }

  //this method is also available in DeliveryDetailsView
  _segregateItems(data, callback) {
    let cakesList = filterItems(data, ITEM_CATEGORY_CAKE);
    let partyPacksList = filterItems(data, ITEM_CATEGORY_PARTY_PACK);
    this.props.setCakesList(cakesList);
    this.props.setPartyPacksList(partyPacksList);
    callback();
  }

  _getVendorItemsList() {
    ApiService.getVendorItems(
      this.props.authToken,
      this.props.deliveryDetails.deliveryVendorId,
      data => {
        console.log(data);
        this._segregateItems(data, () =>
          this.setState({
            spinner: false,
            dataReady: true
          })
        );
      }
    );
  }

  _renderHeaderLocationText() {
    const { deliveryDetails } = this.props;
    return (
      <Grid>
        <Row>
          <Text style={styles.locationNameText}>
            {deliveryDetails.deliveryLocation}
          </Text>
        </Row>
        <Row>
          <Text style={styles.headerLocationText}>
            {deliveryDetails.deliveryAddress}
          </Text>
        </Row>
      </Grid>
    );
  }

  _renderHeader() {
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
                  <Icon
                    name={ICONS.location}
                    style={[styles.headerIcon]}
                    type="MaterialIcons"
                  />
                  {this._renderHeaderLocationText()}
                </View>
              </Col>
              <Col size={25} style={styles.timeViewCol}>
                <View style={styles.timeView}>
                  <Icon
                    name={ICONS.time}
                    style={styles.headerIcon}
                    type="MaterialIcons"
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

  _renderSpinner() {
    return <Spinner visible={this.state.spinner} />;
  }

  _onClickItem(itemId) {
    alert(itemId);
  }

  _renderItemCard(item) {
    return (
      <Animatable.View animation="fadeIn">
        <ItemCard
          itemId={item.itemId}
          itemName={item.itemName}
          itemPrice={item.itemPrice}
          imageUrl={item.imageUrl}
          itemSlab={item.quantitySlab}
          itemUnit="kg"
          touchHandler={this._onClickItem}
        />
      </Animatable.View>
    );
  }

  _renderItemsList() {
    return (
      <FlatList
        data={this.props.cakesList}
        renderItem={({ item }) => this._renderItemCard(item)}
        numColumns={2}
      />
    );
  }

  render() {
    return (
      <Container>
        <StatusBar barStyle="dark-content" backgroundColor="black" />
        {this._renderHeader()}
        <Content style={CommonStyles.statusBarMargin} padder>
          {this._renderSpinner()}
          {this._renderItemsList()}
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
  deliveryDetails: state.deliveryDetails,
  cakesList: state.cakesList
});

export default connect(
  mapStateToProps,
  Actions
)(CakesView);

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
    fontSize: 13
  },
  locationNameText: {
    fontWeight: "bold",
    color: ON_PRIMARY
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
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  timeViewCol: {
    justifyContent: "center",
    alignItems: "flex-end"
  },
  locationViewCol: {
    justifyContent: "center",
    alignItems: "flex-start"
  },
  listRowView: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
