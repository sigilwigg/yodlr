import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LogOut } from '../actions/profileActionCreators';

function UserInfo({ user }) {
    let history = useHistory();
    let dispatch = useDispatch();

    async function logout() {
        try {
            let res = await dispatch(LogOut());
            if (res === 'logout failure') throw new Error(res);
            if (res === 'logout success') history.push('/home');
        } catch (err) {
            alert(err);
            console.log(err.stack);
        }
    }

    return (
        <div className="UserInfo-Component">
            <h3>{user.firstName} {user.lastName}</h3>
            <p>email: {user.email}</p>
            <p>admin: {user.isAdmin === true ? 'true' : 'false'}</p>
            <p>status: {user.state}</p>
            <button onClick={() => logout()}>logout</button>
        </div>
    )
}

export default UserInfo;