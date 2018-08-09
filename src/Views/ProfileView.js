import React from "react";
import { Container, Content, Text, Button } from "native-base";
import { HeaderLab } from "../Components/HeaderLab";
import { FooterLab } from "../Components/FooterLab";
import { STRINGS } from "../Config/Strings";
import { ICONS } from "../Config/Icons";
import { DBService } from "../Services/DBService";
import { connect } from "react-redux";
import Api from "../Services/Api";

class ProfileView extends React.Component {
  componentDidMount() {
    console.log("Token from state: " + this.props.authToken);
    Api.getCustomerData(this.props.authToken, data => {
      console.log(data);
    });
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
  return { authToken: state.authToken };
};

export default connect(mapStateToProps)(ProfileView);
