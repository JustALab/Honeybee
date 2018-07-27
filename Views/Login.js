import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { LoginView } from './LoginView';
import { AboutView } from './AboutView';
import { PrivacyPolicyView } from './PrivacyPolicyView';
import { TermsConditions } from './TermsConditions';
import { STRINGS } from '../Config/Strings';
import { onPrimary, secondary, secondaryDark } from '../Config/Colors';

export class Login extends React.Component {

    componentWillMount() {
        console.disableYellowBox = true;
    }

    render() {
        return (
            <LoginNavigator />
        );
    }
}

const LoginNavigator = createStackNavigator({
    login: {
        screen: LoginView,
        navigationOptions: {
            header: null
        }
    },
    about: {
        screen: AboutView,
        navigationOptions: {
            title: STRINGS.about
        }
    },
    privacy: {
        screen: PrivacyPolicyView,
        navigationOptions: {
            title: STRINGS.privacyPolicy
        }
    },
    terms: {
        screen: TermsConditions,
        navigationOptions: {
            title: STRINGS.termsConditions
        }
    }
},
{
    initialRouteName: 'login',
    navigationOptions: {
        headerTintColor: secondaryDark,
        headerTitleStyle: {
            color: secondaryDark,
            alignItems: 'center'
        }
    }
}); 