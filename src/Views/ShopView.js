import React from 'react';
import {Container, Content, Text} from 'native-base';
import {HeaderLab} from '../Components/HeaderLab';
import {FooterLab} from '../Components/FooterLab';
import { STRINGS } from '../Config/Strings';
import { ICONS } from '../Config/Icons';

export class ShopView extends React.Component {
  render() {
    return (
      <Container>
        <HeaderLab title={STRINGS.shop} leftButton={ICONS.menu}/>
        <Content>
            <Text>{STRINGS.shop}</Text>
        </Content>
        <FooterLab activeButton={STRINGS.shop} {...this.props}/>
      </Container>
    );
  }
}