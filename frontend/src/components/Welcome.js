import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

function Welcome() {
    const profile = useSelector(store => store.profile);
    const history = useHistory();

    if (profile.isLoggedIn) history.push('/home');

    return (
        <div className="Welcome-Component">
            <h2>WELCOME</h2>
            <Link to='/signin'><button>Log In!</button></Link>
            <Link to='/signup'><button>Sign Up!</button></Link>
        </div>
    )
}

export default Welcome;