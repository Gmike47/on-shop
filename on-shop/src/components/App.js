import React, { useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './App.css';

import Account from '../routes/Account/Account';
import Cart from '../routes/Cart/Cart';
import Checkout from '../routes/Checkout/Checkout';
import Home from '../routes/Home/Home';
import Login from '../routes/Login/Login';
import Orders from '../routes/Orders/Orders';
import OrderDetails from '../routes/OrderDetails/OrderDetails';
import ProdctDetails from '../routes/ProductDetails/ProductDetails';
import Register from '../routes/Register/Register';

import Header from './Header/Header';
import PrivatRoute from './PrivateRoute/PrivateRoute';

import { checkLoginStatus } from '../store/auth/Auth.actions';
import { register } from '../apis/auth';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        async function isLoggedIn() {
            await dispatch(checkLoginStatus());
        }
        isLoggedIn();
    }, [dispatch]);

    return (
        <div style={{flex: 1}}>
            <Router>
                <Header />
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/login' component={Login} />
                    <Route path='/products/:productId' component={ProdctDetails} />
                    <Route path='/register' component={Register} />
                    <Route path='/orders' component={Orders} />

                    <PrivatRoute exact path='/account' component={Account} />
                    <PrivatRoute exact path='/cart' component={Cart} />
                    <PrivatRoute exact path='/checkout' component={Checkout} />
                    <PrivatRoute exact path='/orders' component={Orders} />
                    <PrivatRoute exact path='/orders/:orderId' component={OrderDetails} />

                    <Redirect from='*' to='/' />
                </Switch>
            </Router>
        </div>
    );
}

export default App;