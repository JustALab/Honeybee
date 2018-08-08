import React from 'react';
import { View } from 'react-native';
import { Container, Content, Text } from 'native-base';
import { textStyle } from '../Config/Styles';

export class PrivacyPolicyView extends React.Component {
    render() {
        return (
            <Container>
                <Content padder>
                    <View style={styles.viewStyle} >
                        <Text style={[textStyle.textColor, styles.textStyle]}></Text>
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