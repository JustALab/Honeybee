import React from "react";
import { Footer, FooterTab, Button, Text, Badge } from "native-base";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ICONS } from "../Config/Icons";
import {
  STRINGS,
  VIEW_CAKES,
  VIEW_SHOP,
  VIEW_CART,
  VIEW_ORDERS,
  VIEW_PROFILE
} from "../Config/Strings";
import {
  ICON_BLUE,
  ON_PRIMARY,
  PRIMARY,
  SECONDARYDark,
  ON_SECONDARY,
  PRIMARY_DARK,
  PRIMARY_LIGHT,
  SECONDARY,
  ICON_ACTIVE,
  ICON_INACTIVE
} from "../Config/Colors";

export class FooterLab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartValue: 0
    };
  }

  render() {
    return (
      <Footer>
        <FooterTab style={styles.footer}>
          <Button
            onPress={() => {
              this.props.navigation.navigate(VIEW_CAKES);
            }} //active={this.props.activeButton === STRINGS.cakes}
          >
            <Icon
              name={ICONS.cake}
              size={iconSize}
              style={
                this.props.activeButton === STRINGS.cakes
                  ? styles.ICON_INACTIVE
                  : styles.icon
              }
            />
            {/* <Text style={styles.text} >{STRINGS.cakes}</Text> */}
          </Button>

          <Button
            onPress={() => {
              this.props.navigation.navigate(VIEW_SHOP);
            }} //active={this.props.activeButton === STRINGS.shop}
          >
            <Icon
              name={ICONS.bag}
              size={iconSize}
              style={
                this.props.activeButton === STRINGS.shop
                  ? styles.ICON_INACTIVE
                  : styles.icon
              }
            />
            {/* <Text style={styles.text} >{STRINGS.shop}</Text> */}
          </Button>

          <Button
            badge
            vertical
            onPress={() => {
              this.props.navigation.navigate(VIEW_CART);
            }} //active={this.props.activeButton === STRINGS.cart}
          >
            {this.state.cartValue > 0 && (
              <Badge>
                <Text>{this.state.cartValue}</Text>
              </Badge>
            )}
            <Icon
              name={ICONS.cart}
              size={iconSize}
              style={
                this.props.activeButton === STRINGS.cart
                  ? styles.ICON_INACTIVE
                  : styles.icon
              }
            />
            {/* <Text style={styles.text} >{STRINGS.cart}</Text> */}
          </Button>

          <Button
            onPress={() => {
              this.props.navigation.navigate(VIEW_ORDERS);
            }} //active={this.props.activeButton === STRINGS.orders}
          >
            <Icon
              name={ICONS.history}
              size={iconSize}
              style={
                this.props.activeButton === STRINGS.orders
                  ? styles.ICON_INACTIVE
                  : styles.icon
              }
            />
            {/* <Text style={styles.text} >{STRINGS.orders}</Text> */}
          </Button>

          <Button
            onPress={() => {
              this.props.navigation.navigate(VIEW_PROFILE);
            }} //active={this.props.activeButton === STRINGS.profile}
          >
            <Icon
              name={ICONS.profile}
              size={iconSize}
              style={
                this.props.activeButton === STRINGS.profile
                  ? styles.ICON_INACTIVE
                  : styles.icon
              }
            />
            {/* <Text style={styles.text} >{STRINGS.profile}</Text> */}
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

const iconSize = 25;
const styles = StyleSheet.create({
  icon: {
    color: ICON_INACTIVE
  },
  ICON_INACTIVE: {
    color: ICON_ACTIVE
  },
  footer: {
    backgroundColor: PRIMARY_LIGHT,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowColor: ON_PRIMARY,
    shadowOpacity: 0.8,
    elevation: 1
  }
});
