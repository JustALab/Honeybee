import React from 'react';
import { View } from 'react-native';
import { Container, Content, Text } from 'native-base';
import { textStyle } from '../Config/Styles';

export class AboutView extends React.Component {
    render() {
        return (
            <Container>
                <Content padder>
                    <View style={styles.viewStyle} >
                        <Text style={[textStyle.textColor, styles.textStyle]}>The first cake online delivery service in OMR,Chennai</Text>

                        <Text style={[textStyle.textColor, styles.textStyle]}>Honeycakes is an intelligent application to connect people with bakers in their locality. Hence, people can order cakes by using simple fluid UI and get it delivered on time at your doorstep. Rich,elegant and oven fresh signature cakes for all memorable occasions.In busy work schedule, people dont have to waste time to locate and visit bakers to order a cake and travel with cake box for an occassion.</Text>

                        <Text style={[textStyle.textColor, styles.textStyle]}>Our mission is to deliver cakes whenever you need on time. We thus provide a wide collection of premium and classic fresh cakes and to serve joy and happiness along with quality cakes on time.We have leading vendors including Yum Cakes, FB Cakes, Cake world for baking cakes of your desire.Everything is baked using only fresh and natural ingredients such as butter,real creams and imported chocolates.We are proud to serve you and work hard to earn your business.</Text>
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = {
    viewStyle: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'justify'
    },
    textStyle: {
        paddingTop: 20
    }
};