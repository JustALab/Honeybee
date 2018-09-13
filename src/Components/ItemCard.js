import React from "react";
import { Card, CardItem, Text } from "native-base";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import PropTypes from "prop-types";

const CURRENCY_SYMBOL = "₹";
const STR_SPACE = " ";
const SYMBOL_SLASH = "/";
const SCREEN_W = Dimensions.get("window").height;

class ItemCard extends React.Component {
  _renderPriceText() {
    const priceTextNoSlab =
      CURRENCY_SYMBOL +
      this.props.itemPrice +
      SYMBOL_SLASH +
      this.props.itemUnit;
    const priceTextWithSlab =
      CURRENCY_SYMBOL +
      this.props.itemPrice +
      SYMBOL_SLASH +
      this.props.itemSlab +
      STR_SPACE +
      this.props.itemUnit;
    let priceText =
      this.props.itemSlab === 1 ? priceTextNoSlab : priceTextWithSlab;
    return <Text style={styles.itemPriceText}>{priceText}</Text>;
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.touchHandler(this.props.itemId)}
      >
        <Card style={styles.card}>
          <CardItem>
            <Image
              source={{ uri: this.props.imageUrl }}
              style={styles.cardImage}
              resizeMode="cover"
            />
          </CardItem>
          <CardItem>
            <View style={styles.itemNameView}>
              <Text style={styles.itemNameText}>{this.props.itemName}</Text>
            </View>
          </CardItem>
          <CardItem>
            <View style={styles.itemPriceView}>{this._renderPriceText()}</View>
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  itemNameText: {
    fontWeight: "bold",
    fontSize: 15
  },
  itemPriceText: {
    color: "#767989",
    fontSize: 12,
    marginTop: -15
  },
  itemNameView: {
    alignItems: "flex-start",
    marginTop: -15,
    marginLeft: -8
  },
  itemPriceView: {
    alignItems: "flex-end"
  },
  cardImage: {
    height: 90,
    width: SCREEN_W * 0.26,
    marginLeft: -15,
    marginTop: -10
  },
  card: {
    height: 142,
    width: SCREEN_W * 0.26
  }
});

ItemCard.propTypes = {
  itemId: PropTypes.any.isRequired,
  itemName: PropTypes.string.isRequired,
  itemPrice: PropTypes.number.isRequired,
  itemSlab: PropTypes.number.isRequired,
  itemUnit: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  touchHandler: PropTypes.func.isRequired
};

export default ItemCard;
