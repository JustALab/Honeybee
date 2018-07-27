import React from 'react';
import { StyleSheet, View, Image, TouchableHighlight } from 'react-native';
import { Container, Content, Form, Input, Item, Text, Button } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { ICONS } from '../Config/Icons';
import { primary, secondary, onPrimary } from '../Config/Colors';

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
                                <Item >
                                    <Input placeholder='Email' />
                                    <Icon size={iconsSize} name={ICONS.mail} />
                                </Item>
                                <Item >
                                    <Input placeholder='Password' secureTextEntry={true} />
                                    <Icon size={iconsSize} name={ICONS.key} />
                                </Item>
                            </Form>
                        </View>
                        <View style={styles.btnView}>
                            <Button style={styles.signInBtn}>
                                <Text style={styles.btnText}>Sign In</Text>
                            </Button>
                        </View>
                        <View style={styles.linksView}>
                            <Text style={styles.text} >Sign Up</Text>
                            <Text style={styles.text} > | </Text>
                            <Text style={styles.text} >Forgot Password</Text>
                        </View>
                        <View style={[styles.linksView, {paddingTop: 20}]}>
                            <Text onPress={() => this.props.navigation.navigate('about')} style={styles.text} >About</Text>
                            <Text style={styles.text} > | </Text>
                            <Text onPress={() => this.props.navigation.navigate('privacy')} style={styles.text} >Privacy Policy</Text>
                            <Text style={styles.text} > | </Text>
                            <Text onPress={() => this.props.navigation.navigate('terms')} style={styles.text} >Terms & Conditions</Text>
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
        paddingTop: 20
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
        paddingTop: 50
    },
    text: {
        color: onPrimary
    }
});