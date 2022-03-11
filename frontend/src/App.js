import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Home from './components/Home';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import ProductDetails from './components/product/ProductDetails';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Container fluid>
          <Route path="/" exact component={Home} />
          <Route path="/search/:keyword"  component={Home} />
          <Route path="/product/:id" component={ProductDetails} />
        </Container>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
