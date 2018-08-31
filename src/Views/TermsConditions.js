import React from "react";
import { View } from "react-native";
import { Container, Content, Text } from "native-base";
import CommonStyles from "../Commons/Styles";

export class TermsConditions extends React.Component {
  render() {
    return (
      <Container>
        <Content padder>
          <View style={styles.viewStyle}>
            <Text style={[CommonStyles.headerTitle, styles.textStyle]} />
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = {
  viewStyle: {},
  textStyle: {
    paddingTop: 20
  }
};
