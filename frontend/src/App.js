import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Home from './components/Home';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import ProductDetails from './components/product/ProductDetails';
import Login from './components/user/Login';
import Register from './components/user/Register';

import { loadUser } from './actions/userActions';
import store from './store';
import { useEffect, useState } from 'react';
import Profile from './components/user/Profile';
import ProtectedRoute from './components/route/ProtectedRoute';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import axios from 'axios';

// Payment
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payment from './components/cart/Payment';
import OrderSuccess from './components/cart/OrderSuccess';

function App() {
  const [stripeApiKey, setStripeApiKey] = useState('');

  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripApiKey() {
      const { data } = await axios.get('/api/v1/stripeapi');

      setStripeApiKey(data.stripeApiKey);
    }

    getStripApiKey();
  }, [stripeApiKey]);

  return (
    <Router>
      <div>
        <Header />
        <Container fluid>
          <Route path="/" exact component={Home} />
          <Route path="/search/:keyword" component={Home} />
          <Route path="/product/:id" component={ProductDetails} />
          <Route path="/cart" component={Cart} exact />
          <ProtectedRoute path="/shipping" component={Shipping} />
          <ProtectedRoute path="/order/confirm" component={ConfirmOrder} />
          <ProtectedRoute path="/success" component={OrderSuccess} />
          {stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute path="/payment" component={Payment} />
            </Elements>
          )}

          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/password/forgot" component={ForgotPassword} exact />
          <Route path="/password/reset/:token" component={NewPassword} exact />

          <ProtectedRoute path="/me" component={Profile} exact />
          <ProtectedRoute path="/me/update" component={UpdateProfile} exact />
          <ProtectedRoute
            path="/password/update"
            component={UpdatePassword}
            exact
          />
        </Container>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
