import React from "react";
import { FlatList } from "react-native";
import { Container, Content, Text } from "native-base";
import { HeaderLab } from "../Components/HeaderLab";
import { FooterLab } from "../Components/FooterLab";
import { STRINGS } from "../Config/Strings";
import { ICONS } from "../Config/Icons";
import { connect } from "react-redux";
import ItemCard from "../Components/ItemCard";

class ShopView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  componentDidMount() {
    if (this.props.partyPacksList !== null) {
      this.setState({ isReady: true });
    }
  }

  _onClickItem(itemId) {
    alert(itemId);
  }

  _renderItemCard(item) {
    return (
      <ItemCard
        itemId={item.itemId}
        itemName={item.itemName}
        itemPrice={item.itemPrice}
        imageUrl={item.imageUrl}
        itemSlab={item.quantitySlab}
        itemUnit="unit"
        touchHandler={this._onClickItem}
      />
    );
  }

  _renderItemsList() {
    return (
      <FlatList
        data={this.props.partyPacksList}
        renderItem={({ item }) => this._renderItemCard(item)}
        numColumns={2}
      />
    );
  }

  render() {
    return (
      <Container>
        <HeaderLab title={STRINGS.partyPacks} leftButton={ICONS.menu} />
        <Content padder>
          {this._renderItemsList()}
        </Content>
        <FooterLab activeButton={STRINGS.shop} {...this.props} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  partyPacksList: state.partyPacksList
});

export default connect(mapStateToProps)(ShopView);
