import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import Home from './Pages/Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import NotFound from './Pages/NotFound';
import Products from './Pages/Products';
import ProductDetails from './Pages/ProductDetails';
import ProtectedRoute from './ProtectedRoute';
import Favorites from './Pages/Favorites';
import Cart from './Pages/Cart';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(JSON.parse(localStorage.getItem('isAuthenticated')));

  useEffect(() => {
    const authStatus = JSON.parse(localStorage.getItem('isAuthenticated'));
    if (authStatus) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={() => <LoginPage setIsAuthenticated={setIsAuthenticated} />} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/products" component={Products} />
            <Route exact path="/product/:id" render={(props) => <ProductDetails {...props} isAuthenticated={isAuthenticated} />} />
            <Route path="/favorites" component={Favorites} />
            <ProtectedRoute exact path="/cart" component={Cart} isAuthenticated={isAuthenticated} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
