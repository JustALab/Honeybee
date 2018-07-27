import React from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {Container, Content, Text, Header, Left, Right, Body, Title} from 'native-base';
import {FooterLab} from '../Components/FooterLab';
import { STRINGS } from '../Config/Strings';
import {primary, onPrimary, iconActive, secondary} from '../Config/Colors';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {ICONS} from '../Config/Icons';

export class CakesView extends React.Component {
  render() {
    return (
      <Container>
        <StatusBar barStyle='dark-content' backgroundColor='black' />
        <Header style={styles.header}>
          <Left >
            <MaterialIcon name={ICONS.location} size={iconSize} style={styles.headerLeftIcon}/>
          </Left>
          <Body>
            <Title style={styles.headerTitle}>10, Techno Park, Karapakkam</Title>
          </Body>
          <Right>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialIcon name={ICONS.time} size={iconSize} style={styles.rightIcon}/>
              <Text style={styles.headerTimeColor}>27, July</Text>
            </View>
          </Right>
        </Header>
        <Content>
            <Text>{STRINGS.cakes}</Text>
        </Content>
        <FooterLab activeButton={STRINGS.cakes} {...this.props}/>
      </Container>
    );
  }
}

const iconSize = 25;
const styles = StyleSheet.create({
  header: {
    backgroundColor: primary
  },
  headerTitle: {
    color: onPrimary,
    marginLeft: -30
  }, 
  headerLeftIcon: {
    color: iconActive
  },
  rightIcon: {
    color: iconActive,
  },
  flexBoxx: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  headerTimeColor: {
    color: onPrimary
  }
});