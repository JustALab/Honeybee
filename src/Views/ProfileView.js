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

class ProfileView extends React.Component {
  componentDidMount() {
    console.log("Token from state: " + this.props.authToken);
    if (this.props.isNetworkConnected) {
      ApiService.getCustomerData(this.props.authToken, data => {
        console.log(data);
      });
    } else {
      console.log("No internet connectivity.");
      Alert.alert(
        STRINGS.msgNoConnectivityTitle,
        STRINGS.msgNoConnectivityContent
      );
    }
    console.log("Props:");
    console.log(this.props);
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
    isNetworkConnected: state.isNetworkConnected
  };
};

export default connect(mapStateToProps)(ProfileView);
