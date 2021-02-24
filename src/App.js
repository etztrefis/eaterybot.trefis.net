import React, {useState} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import HomePage from './Pages/Home/Home.js';
import AdminPage from './Pages/Admin/Admin.js';
import Login from './Pages/Login/Login.js';
import Signup from './Pages/Signup/Signup.js';
import Stats from './Pages/Admin/Stats/Stats.js';
import Dishes from './Pages/Admin/Dishes/Dishes.js'
import Products from './Pages/Admin/Products/Products.js';
import {AuthContext} from './context/auth.js';
import PrivateRoute from './Routes/PrivateRoute.js';

import './App.css';

function App(props) {
    const existingTokens = JSON.parse(localStorage.getItem('tokens'));
    const [authTokens, setAuthTokens] = useState(existingTokens);

    const setTokens = (data) => {
        localStorage.setItem('tokens', JSON.stringify(data));
        setAuthTokens(data);
    };
    return (
        <AuthContext.Provider value={{authTokens, setAuthTokens: setTokens}}>
            <Router>
                <div>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <PrivateRoute exact path="/admin/" component={AdminPage} />
                    <PrivateRoute path="/admin/stats" component={Stats} />
                    <PrivateRoute path="/admin/products" component={Products} />
                    <PrivateRoute path="/admin/dishes" component={Dishes} />
                    <PrivateRoute path="/admin/orders" component={Dishes} />
                </div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
