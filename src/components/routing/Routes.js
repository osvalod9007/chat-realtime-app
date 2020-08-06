import React, { lazy } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import ListUsers from './ListUsers';
import Navbar from '../layout/Navbar';

const Admin = lazy(() => import('../pages/Admin'));
const User = lazy(() => import('../pages/User'));
const NotFound = lazy(() => import('../pages/NotFound'));

const Routes = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/' component={() => <Redirect to='/user' />} />
        <Route exact path='/admin' component={ListUsers(Admin)} />
        <Route exact path='/user' component={ListUsers(User)} />
        <Route exact component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
