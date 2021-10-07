import React from 'react';
import './App.css';
import Signup from './Signup';
import Providers from '../contexts/Providers';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './ForgotPassword';
import UpdateProfile from './UpdateProfile';
import Fichas from '../pages/Fichas';
import Ficha from '../pages/Ficha';
import FichaRoute from './FichaRoute';

function App() {
  return (
    <div style={{ minWidth: "100%", minHeight: "100vh", backgroundColor: "#111111", overflowX: 'auto' }}>
      <Router>
        <Providers>
          <Switch>
            <PrivateRoute exact path="/" component={Fichas}/>
            <PrivateRoute path="/profile" component={Dashboard}/>
            <PrivateRoute path="/update-profile" component={UpdateProfile}/>
            <FichaRoute path="/ficha" component={Ficha} />
            <Route path="/signup" component={Signup}/>
            <Route path="/login" component={Login}/>
            <Route path="/forgot-password" component={ForgotPassword}/>
          </Switch>
        </Providers>
      </Router>
    </div>
  )
}

export default App;
