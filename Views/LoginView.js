import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Container, Content, Form, Input, Item, Text, Button, Footer } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { ICONS } from '../Config/Icons';
import { primary, secondary, onPrimary, onSecondary, secondaryDark, iosBlue } from '../Config/Colors';

export class LoginView extends React.Component {
    render() {
        return (
            <Container >
                <Content padder contentContainerStyle={styles.content}>
                    <View style={styles.mainView}>
                        <View style={styles.imageView}>
                            <Image style={styles.image} resizeMode={'contain'} source={require('./images/hc_300.png')} />
                        </View>
                        <View>
                            <Form>
                                <Item style={[styles.widthStyle, styles.inputMargin]} >
                                    <Input placeholder='Email' keyboardType='email-address' />
                                    <Icon size={iconsSize} name={ICONS.mail} />
                                </Item>
                                <Item style={[styles.inputMargin, styles.widthStyle]}>
                                    <Input placeholder='Password' secureTextEntry={true} />
                                    <Icon size={iconsSize} name={ICONS.key} />
                                </Item>
                            </Form>
                        </View>
                        <View style={styles.linksView}>
                            <Text style={{ color: secondaryDark }} onPress={() => this.props.navigation.navigate('register')} >Register</Text>
                            <Text style={styles.text} > | </Text>
                            <Text style={styles.text} >Forgot Password</Text>
                        </View>
                        <View style={styles.btnView}>
                            <Button style={[styles.signInBtn, styles.widthStyle]} full>
                                <Text style={styles.btnText}>SIGN IN</Text>
                            </Button>
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}

const iconsSize = 20;
const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center'
    },
    image: {
        height: 100,
        width: 100
    },
    imageView: {
        // flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    signInBtn: {
        backgroundColor: secondary
    },
    btnText: {
        color: primary
    },
    btnView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30
    },
    mainView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    linksView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10
    },
    text: {
        color: onPrimary
    },
    registerBtnText: {
        color: secondaryDark
    },
    widthStyle: {
        width: '100%'
    },
    inputMargin: {
        marginLeft: 0
    }
});