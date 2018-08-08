import React from "react";
import { Container, Content, Text, Button } from "native-base";
import { HeaderLab } from "../Components/HeaderLab";
import { FooterLab } from "../Components/FooterLab";
import { STRINGS } from "../Config/Strings";
import { ICONS } from "../Config/Icons";
import { DBService } from "../Services/DBService";

export class ProfileView extends React.Component {
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
