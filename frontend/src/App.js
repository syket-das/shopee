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
import { useEffect } from 'react';
import Profile from './components/user/Profile';
import ProtectedRoute from './components/route/ProtectedRoute';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <div>
        <Header />
        <Container fluid>
          <Route path="/" exact component={Home} />
          <Route path="/search/:keyword" component={Home} />
          <Route path="/product/:id" component={ProductDetails} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <ProtectedRoute path="/me" component={Profile} exact />
        </Container>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
