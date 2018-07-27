import React from 'react';
import {Container, Content, Text} from 'native-base';
import {HeaderLab} from '../Components/HeaderLab';
import {FooterLab} from '../Components/FooterLab';
import { STRINGS } from '../Config/Strings';
import { ICONS } from '../Config/Icons';

export class ProfileView extends React.Component {
  render() {
    return (
      <Container>
        <HeaderLab title={STRINGS.profile} leftButton={ICONS.menu}/>
        <Content>
            <Text>{STRINGS.profile}</Text>
        </Content>
        <FooterLab activeButton={STRINGS.profile} {...this.props}/>
      </Container>
    );
  }
}