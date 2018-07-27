import React from 'react';
import { Footer, FooterTab, Button, Text, Badge } from 'native-base';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ICONS } from '../Config/Icons';
import { STRINGS } from '../Config/Strings';
import { iosBlue, onPrimary, primary, secondaryDark, onSecondary, primaryDark, primaryLight, secondary, iconActive, iconInactive } from '../Config/Colors';

export class FooterLab extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cartValue: 0
        }
    }

    render() {
        return (
            <Footer>
                <FooterTab style={styles.footer}>
                    <Button onPress={() => {
                        this.props.navigation.navigate('cakes');
                    }} //active={this.props.activeButton === STRINGS.cakes}
                    >
                        <Icon name={ICONS.cake} size={iconSize} style={this.props.activeButton === STRINGS.cakes ? styles.icon_active : styles.icon} />
                        {/* <Text style={styles.text} >{STRINGS.cakes}</Text> */}
                    </Button>

                    <Button onPress={() => {
                        this.props.navigation.navigate('shop');
                    }} //active={this.props.activeButton === STRINGS.shop} 
                    >
                        <Icon name={ICONS.bag} size={iconSize} style={this.props.activeButton === STRINGS.shop ? styles.icon_active : styles.icon} />
                        {/* <Text style={styles.text} >{STRINGS.shop}</Text> */}
                    </Button>

                    <Button badge vertical onPress={() => {
                        this.props.navigation.navigate('cart');
                    }} //active={this.props.activeButton === STRINGS.cart} 
                    >
                        {
                            this.state.cartValue > 0 &&
                            <Badge><Text>{this.state.cartValue}</Text></Badge>
                        }
                        <Icon name={ICONS.cart} size={iconSize} style={this.props.activeButton === STRINGS.cart ? styles.icon_active : styles.icon} />
                        {/* <Text style={styles.text} >{STRINGS.cart}</Text> */}
                    </Button>

                    <Button onPress={() => {
                        this.props.navigation.navigate('orders');
                    }} //active={this.props.activeButton === STRINGS.orders}
                    >
                        <Icon name={ICONS.history} size={iconSize} style={this.props.activeButton === STRINGS.orders ? styles.icon_active : styles.icon} />
                        {/* <Text style={styles.text} >{STRINGS.orders}</Text> */}
                    </Button>

                    <Button onPress={() => {
                        this.props.navigation.navigate('profile');
                    }} //active={this.props.activeButton === STRINGS.profile}
                    >
                        <Icon name={ICONS.profile} size={iconSize} style={this.props.activeButton === STRINGS.profile ? styles.icon_active : styles.icon} />
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
        color: iconInactive
    },
    icon_active: {
        color: iconActive
    },
    footer: {
        backgroundColor: primaryLight,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowColor: onPrimary,
        shadowOpacity: 0.8,
        elevation: 1
    }
});

