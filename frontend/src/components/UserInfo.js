import React from 'react';

function UserInfo({ user }) {
    return (
        <div className="UserInfo-Component">
            <h3>{user.firstName} {user.lastName}</h3>
            <p>email: {user.email}</p>
            <p>admin: {user.isAdmin == true ? 'true' : 'false'}</p>
            <p>status: {user.state}</p>
        </div>
    )
}

export default UserInfo;