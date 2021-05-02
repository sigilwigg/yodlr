import React from 'react';
import { v4 as uuid } from 'uuid';
import ListItem from './ListItem';

function UserList({ list, changeStatus, changeIsAdmin }) {
    return (
        <div className="UserList-Component">
            {list.map(user => {
                return <ListItem
                    key={uuid()}
                    user={user}
                    changeStatus={changeStatus}
                    changeIsAdmin={changeIsAdmin}
                />
            })}
        </div>
    )
}

export default UserList;