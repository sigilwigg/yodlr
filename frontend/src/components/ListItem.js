import React from 'react';

function ListItem({ user, changeStatus, changeIsAdmin }) {
    return (
        <div className="ListItem-Component">
            <h5>{user.firstName} {user.lastName}</h5>
            <p>email: {user.email}</p>
            <p>admin: {user.isAdmin === true ? 'true ' : 'false '}
                <button onClick={() => changeIsAdmin(user.id, user)}>Change</button>
            </p>
            <p>status: {user.state + ' '}
                <button onClick={() => changeStatus(user.id, user)}>Change</button>
            </p>
        </div>
    )
}

export default ListItem;