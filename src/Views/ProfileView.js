import React from "react";
import { Alert } from "react-native";
import { Container, Content, Text, Button } from "native-base";
import { HeaderLab } from "../Components/HeaderLab";
import { FooterLab } from "../Components/FooterLab";
import { STRINGS } from "../Config/Strings";
import { ICONS } from "../Config/Icons";
import { DBService } from "../Services/DBService";
import { connect } from "react-redux";
import ApiService from "../Services/ApiService";
import * as Actions from "../Actions";
import Spinner from "react-native-loading-spinner-overlay";
import { white } from "../Config/Colors";

class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false
    };
  }

  componentDidMount() {
    if (this.props.customerData === null) {
      if (this.props.isNetworkConnected) {
        this.setState({ spinner: true }, () => {
          ApiService.getCustomerData(this.props.authToken, data => {
            console.log(data);
            this.props.setCustomerData(data);
            this.setState({ spinner: false });
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

  render() {
    return (
      <Container>
        <HeaderLab title={STRINGS.profile} leftButton={ICONS.menu} />
        <Content>
          <Button
            onPress={() => {
              DBService.unsetLoggedInStatus();
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
