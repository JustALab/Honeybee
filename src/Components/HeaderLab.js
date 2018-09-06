import React from "react";
import { StyleSheet } from "react-native";
import { Header, Left, Right, Body, Icon, Title } from "native-base";
import { ICONS } from "../Config/Icons";
import { STRINGS } from "../Config/Strings";
import { PRIMARY, SECONDARY, ON_PRIMARY } from "../Config/Colors";
import CommonStyles from "../Commons/Styles";

export class HeaderLab extends React.Component {
  render() {
    let headerLeftIcon;
    if (this.props.leftButton === STRINGS.menu) {
      headerLeftIcon = <Icon name={ICONS.menu} style={styles.headerIconLeft} />;
    } else if (this.props.leftButton === STRINGS.close) {
      headerLeftIcon = (
        <Icon name={ICONS.close} style={styles.headerIconLeft} />
      );
    } else if (this.props.leftButton === STRINGS.back) {
      headerLeftIcon = <Icon name={ICONS.back} style={styles.headerIconLeft} />;
    }

    return (
      <Header style={styles.header}>
        <Left>{headerLeftIcon}</Left>
        <Body>
          <Title style={CommonStyles.headerTitle}>{this.props.title}</Title>
        </Body>
        <Right />
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  headerIconLeft: {
    paddingLeft: 2,
    color: SECONDARY
  },
  header: {
    backgroundColor: PRIMARY
  }
});
