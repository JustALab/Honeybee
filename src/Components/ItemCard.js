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
const SCREEN_W = Dimensions.get("window").height;

class ItemCard extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.touchHandler(this.props.itemName)}
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
            <View style={styles.itemPriceView}>
              <Text style={styles.itemPriceText}>
                {CURRENCY_SYMBOL + this.props.itemPrice}
              </Text>
            </View>
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
    width: SCREEN_W * 0.25,
    marginLeft: -15,
    marginTop: -10
  },
  card: {
    height: 142,
    width: SCREEN_W * 0.25
  }
});

ItemCard.propTypes = {
  itemName: PropTypes.string.isRequired,
  itemPrice: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  touchHandler: PropTypes.func.isRequired
};

export default ItemCard;
