import React from "react";
import { View } from "react-native";
import { Container, Content, Text } from "native-base";
import CommonStyles from "../Commons/Styles";

export class PrivacyPolicyView extends React.Component {
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
  viewStyle: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  },
  textStyle: {
    paddingTop: 20
  }
};
