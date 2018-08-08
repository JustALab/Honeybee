import React from 'react';
import {Container, Content, Text} from 'native-base';
import {HeaderLab} from '../Components/HeaderLab';
import {FooterLab} from '../Components/FooterLab';
import { STRINGS } from '../Config/Strings';
import { ICONS } from '../Config/Icons';

export class CartView extends React.Component {
  render() {
    return (
      <Container>
        <HeaderLab title={STRINGS.cart} leftButton={ICONS.menu}/>
        <Content>
            <Text>{STRINGS.cart}</Text>
        </Content>
        <FooterLab activeButton={STRINGS.cart} {...this.props}/>
      </Container>
    );
  }
}