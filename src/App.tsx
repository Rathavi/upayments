import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import Header from './components/header';
import NewProduct from './components/newproduct';
import Product from './components/product';
import Home from './components/home';
import Register from './components/register';

class App extends React.Component {
  state = {
    className: ''
  }

  render() {
    return (<Router>
      <div className='container mx-auto px-4'>
        <Header />
        <main>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/product/create" element={<NewProduct />} />
            <Route path="/product/:id" element={<Product  />} />
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>);
  }
}

export default App;
