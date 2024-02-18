import React, { useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './App.css';

import Account from '../routes/Account/Account';
import Cart from '../routes/Cart/Cart';
import Checkout from '../routes/Checkout/Checkout';