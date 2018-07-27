import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Image } from 'react-native';
import { Container } from 'native-base';
import { DBService } from '../Services/DBService';

export class SplashView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        DBService.initDB();
        setTimeout(() => { this.props.navigation.navigate('login') }, 5000);
    }

    render() {
        return (
            <Container style={styles.container}>
                <View>
                    <StatusBar hidden={true} />
                    <Image style={styles.image} resizeMode={'contain'} source={require('./images/hc_logo.png')} />
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 300,
        width: 300
    }
});