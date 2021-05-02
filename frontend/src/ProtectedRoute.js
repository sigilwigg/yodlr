import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = (props) => {
    const profile = useSelector(store => store.profile);

    return (profile.isLoggedIn ? props.children : <Redirect to={{ pathname: '/' }} />)
}

export default ProtectedRoute;