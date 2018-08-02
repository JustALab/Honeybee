import React from 'react';
import { StyleSheet, View, Image, NetInfo, Alert } from 'react-native';
import { Container, Content, Form, Input, Item, Text, Button } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { ICONS } from '../Config/Icons';
import { primary, secondary, onPrimary, onSecondary, secondaryDark, iosBlue } from '../Config/Colors';
import { STRINGS } from '../Config/Strings';
import axios from 'axios';
import {host, authUrl} from '../Config/Server';

export class LoginView extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.handleLogin = this.handleLogin.bind(this);
    }

    componentDidMount = () => {
        NetInfo.isConnected.fetch().then(isConnected => {
            if(!isConnected) {
                Alert.alert(STRINGS.msgNoConnectivityTitle, STRINGS.msgNoConnectivityContent);
            }
        });
    }

    handleLogin = () => {
        let loginPayload = {
            username: this.state.email,
            password: this.state.password 
        };
        console.log(loginPayload.username);
        console.log(loginPayload.password);
        NetInfo.isConnected.fetch().then(isConnected => {
            if(isConnected) {
                console.log(host + authUrl);
                axios.post(host + authUrl, loginPayload).then(res => {
                    console.log('**** token: ' + res.data.token);
                }).catch(err => {
                    console.log(err)
                });
            } else {
                Alert.alert(STRINGS.msgNoConnectivityTitle, STRINGS.msgNoConnectivityContent);
            }
        });
    }

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
                                    <Input placeholder='Email' keyboardType='email-address' onChangeText={(email) => this.setState({email})} autoCapitalize='none' />
                                    <Icon size={iconsSize} name={ICONS.mail} />
                                </Item>
                                <Item style={[styles.inputMargin, styles.widthStyle]}>
                                    <Input placeholder='Password' secureTextEntry={true} onChangeText={(password) => this.setState({password})} />
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
                            <Button style={[styles.signInBtn, styles.widthStyle]} onPress={this.handleLogin} full>
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