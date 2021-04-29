import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import Signup from './components/Signup';
import Signin from './components/Signin';
import Home from './components/Home';

function Routes() {
    return (
        <Switch>
            <Route path='/signup'><Signup /></Route>
            <Route path='/signin'><Signin /></Route>
            <ProtectedRoute path='/home'><Home /></ProtectedRoute>
            <Route path='/'><Welcome /></Route>
        </Switch>
    )
}