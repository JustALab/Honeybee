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
  Left,
  Title,
  Right
} from "native-base";
import { FooterLab } from "../Components/FooterLab";
import { STRINGS } from "../Config/Strings";
import { primary, onPrimary, iconActive, secondary } from "../Config/Colors";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { ICONS } from "../Config/Icons";
import CommonStyles from "../Commons/Styles";
import { Col, Grid } from "react-native-easy-grid";
import { connect } from "react-redux";
import * as Actions from "../Actions";

class CakesView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationTimeModalVisible: false,
      selectedAddress: "Choose your location...",
      selectedAddressType: "",
      selectedDate: "",
      selectedTime: "ASAP"
    };
  }

  renderHeader() {
    return (
      <TouchableOpacity
        onPress={() => this.setState({ locationTimeModalVisible: true })}
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
                  <Text style={styles.headerLocationText}>
                    {this.state.selectedAddress}
                  </Text>
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
                    {this.state.selectedTime}
                  </Text>
                </View>
              </Col>
            </Grid>
          </Body>
        </Header>
      </TouchableOpacity>
    );
  }

  renderModalHeader() {
    return (
      <Header>
        <Left>
          <TouchableOpacity
            onPress={() => this.setState({ locationTimeModalVisible: false })}
          >
            <MaterialIcon
              name={STRINGS.close}
              size={25}
              style={styles.modalCloseIcon}
            />
          </TouchableOpacity>
        </Left>
        <Body>
          <Title style={CommonStyles.headerTitle}>Delivery</Title>>
        </Body>
        <Right />
      </Header>
    );
  }

  renderLocationTimeModal() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.locationTimeModalVisible}
        onRequestClose={() => {
          this.setState({ locationTimeModalVisible: false });
        }}
      >
        <View>{this.renderModalHeader()}</View>
      </Modal>
    );
  }

  render() {
    return (
      <Container>
        <StatusBar barStyle="dark-content" backgroundColor="black" />
        {this.renderHeader()}
        <Content style={CommonStyles.statusBarMargin} />
        {this.renderLocationTimeModal()}
        <FooterLab activeButton={STRINGS.cakes} {...this.props} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  authToken: state.authToken,
  isNetworkConnected: state.isNetworkConnected,
  customerData: state.customerData
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
  },
  modalCloseIcon: {
    color: iconActive
  }
});
