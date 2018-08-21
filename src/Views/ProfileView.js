import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Container, Content, Text, Button } from "native-base";
import { HeaderLab } from "../Components/HeaderLab";
import { FooterLab } from "../Components/FooterLab";
import {
  STRINGS,
  VIEW_LOGIN,
  VIEW_TERMS,
  VIEW_PROFILE_LOGIN
} from "../Config/Strings";
import { ICONS } from "../Config/Icons";
import { DBService } from "../Services/DBService";
import { connect } from "react-redux";
import ApiService from "../Services/ApiService";
import * as Actions from "../Actions";
import Spinner from "react-native-loading-spinner-overlay";
import { white, onPrimary, background1 } from "../Config/Colors";
import { Avatar, List, ListItem } from "react-native-elements";

class ProfileView extends React.Component {
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
    if (this.props.customerData === null) {
      if (this.props.isNetworkConnected) {
        this.setState({ spinner: true }, () => {
          ApiService.getCustomerData(this.props.authToken, data => {
            console.log(data);
            this.props.setCustomerData(data);
            this.setState({ spinner: false, dataReady: true });
          });
        });
      } else {
        console.log("No internet connectivity.");
        Alert.alert(
          STRINGS.msgNoConnectivityTitle,
          STRINGS.msgNoConnectivityContent
        );
      }
    }
  }

  renderAvatarTexts() {
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

  renderFunctionList() {
    return (
      <View>
        <List>
          <ListItem
            key="terms"
            title="Terms & Conditions"
            onPress={() => this.props.navigation.navigate("profileTerms")}
          />
        </List>
      </View>
    );
  }

  render() {
    return (
      <Container>
        <HeaderLab title={STRINGS.profile} leftButton={ICONS.menu} />
        <Content>
          <View style={styles.avatarView}>
            <Avatar
              large
              rounded
              source={require("./images/user_avatar.jpg")}
              onPress={() => console.log("Works!")}
              activeOpacity={0.7}
            />
            {this.state.dataReady && this.renderAvatarTexts()}
          </View>
          {this.renderFunctionList()}
          <Button
            onPress={() => {
              DBService.unsetLoggedInStatus();
              this.props.navigation.navigate(VIEW_PROFILE_LOGIN);
            }}
          >
            <Text>Sign Out</Text>
          </Button>
          <Spinner visible={this.state.spinner} textStyle={{ color: white }} />
        </Content>
        <FooterLab activeButton={STRINGS.profile} {...this.props} />
      </Container>
    );
  }
}

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
  }
});
