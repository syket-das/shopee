import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Home from './components/Home';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Container fluid>
          <Routes>
            <Route path="/" exact element={<Home />} />
          </Routes>
        </Container>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
