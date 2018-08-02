import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { CakesView } from './CakesView';
import { ShopView } from './ShopView';
import { CartView } from './CartView';
import { OrdersView } from './OrdersView';
import { ProfileView } from './ProfileView';

export class MainView extends React.Component {
    render() {
        return (
            <MainRoutes />
        );
    }
}

const MainRoutes = createSwitchNavigator({
    cakes: {
        screen: CakesView
    },
    shop: {
        screen: ShopView
    },
    cart: {
        screen: CartView
    },
    orders: {
        screen: OrdersView
    },
    profile: {
        screen: ProfileView
    }
    }, {
    initialRouteName: 'cakes',
    headerMode: 'none'
});
