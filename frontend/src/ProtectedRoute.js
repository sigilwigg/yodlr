import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = (props) => {
    const users = useSelector(store => store.users);

    return (users.isLoggedIn ? props.children : <Redirect to={{ pathname: '/' }} />)
}

export default ProtectedRoute;